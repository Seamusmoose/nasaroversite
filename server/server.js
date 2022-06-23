const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://mars.nasa.gov/msl/weather/");

  const grabInfo = await page.evaluate(() => {
    let items = [...document.querySelectorAll(".item")];
    return items.map((item) => {
      const newMap = new Map();
      newMap["Sol"] = item.childNodes[0].innerText;
      newMap["Date"] = item.childNodes[1].innerText;
      newMap["High"] = item.childNodes[4].innerText.split("C")[0];
      newMap["Low"] = item.childNodes[4].innerText.split("C")[1];
      return newMap;

      // const Date = item.childNodes[1].innerText;
      // const High = item.childNodes[5].innerText;
      // const Low = item.childNodes[6].innerText;
    });
  });

  console.log(grabInfo, "INFO");
  await browser.close();
})();
