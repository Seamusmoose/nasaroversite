const puppeteer = require("puppeteer");
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;

require('dotenv').config();


app.get("/weather", async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  

  const aboutBlankPage = (await browser.pages())[0];
  if (aboutBlankPage) {
    await aboutBlankPage.close();
  }

  const page = await browser.newPage();
  await page.goto("https://mars.nasa.gov/msl/weather/");

  const nasaWeatherDataScrape = await page.evaluate(() => {
    let items = [...document.querySelectorAll(".item")];
    return items.map((item) => {
      const newMap = new Map();
      newMap["Sol"] = item.childNodes[0].innerText.split(" ").pop();
      newMap["Date"] = item.childNodes[1].innerText;
      newMap["High"] = item.childNodes[4].innerText
        .split("C")[0]
        .split(" ")
        .pop();
      newMap["Low"] = item.childNodes[4].innerText
        .split("C")[1]
        .split(" ")
        .pop();
      return newMap;
    });
  });

  console.log(nasaWeatherDataScrape, "in");
  res.send(nasaWeatherDataScrape);

  const newPage = (await browser.pages())[0];
  await newPage.close();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};


process.on('uncaughtException', function (err) {
  console.log(err);
});
// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));

