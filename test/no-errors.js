import puppeteer from "puppeteer";

// After `npm run docs:dev`

(async () => {
  const browser = await puppeteer.launch({dumpio: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/documentation/");
  await browser.close();
})();