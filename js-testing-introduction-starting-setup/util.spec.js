const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util'); // native way of importing in JEST

test('should output name and age', () => {
  const text = generateText('Max', 29);

  expect(text).toBe('Max (29 years old)');

  const textTwo = generateText('Anna', 28);
  expect(textTwo).toBe('Anna (28 years old)');

});

test('should output data-less text', () => {
  const text = generateText('', null);

  expect(text).toBe(' (null years old)');
})


test('should generate a valid text output', () => {
  const text = checkAndGenerate('Cian', 30);
  expect(text).toBe('Cian (30 years old)');

})

test('should click add correct user information', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // headless: false,
    // slowMo: 80,
    // args: ['--window-size=1920,1080']
  }) // << this will return a promise

  const page = await browser.newPage();
  await page.goto(
    'file:///C:/Users/cian.oruanaidh/Desktop/~learning/js-testing-introduction-starting-setup/index.html'
  );

  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.click('input#age');
  await page.type('input#age', '28');
  await page.click('#btnAddUser');
 
  const finalText = await page.$eval('.user-item', el => el.textContent );

  expect(finalText).toBe('Anna (28 years old)');


}, 10000); // 10000 << max timeout
