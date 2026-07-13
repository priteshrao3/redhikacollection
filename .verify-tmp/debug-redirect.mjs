import { chromium } from "playwright";

const BASE = "http://localhost:3002";
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

page.on("pageerror", (err) => log("PAGE ERROR:", err.message));
page.on("console", (msg) => log(`CONSOLE ${msg.type()}:`, msg.text()));
page.on("response", (res) => {
  if (res.url().includes("/admin") || res.url().includes("/login") || res.url().includes("auth")) {
    log("RESPONSE", res.status(), res.url());
  }
});

await page.goto(`${BASE}/admin/products`, { waitUntil: "networkidle" });
log("after guarded nav, url:", page.url());

await page.fill('input[type="email"]', "admin@gmail.com");
await page.fill('input[type="password"]', "admin");

const cookiesBefore = await ctx.cookies();
log("cookies before login:", cookiesBefore.map(c => c.name));

await page.getByRole("button", { name: "LOGIN" }).click();

try {
  await page.waitForURL("**/admin/products", { timeout: 10000 });
  log("SUCCESS ended at:", page.url());
} catch {
  log("TIMED OUT waiting for /admin/products, current url:", page.url());
}

const cookiesAfter = await ctx.cookies();
log("cookies after login:", cookiesAfter.map(c => `${c.name}=${c.value.slice(0,20)}...`));

await browser.close();
