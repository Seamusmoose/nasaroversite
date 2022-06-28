const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/weather", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://mars.nasa.gov/msl/weather/");

  const grabInfo = await page.evaluate(() => {
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

  console.log(grabInfo, "in");
  res.json(grabInfo);
  await browser.close();
});

app.listen(5000);
