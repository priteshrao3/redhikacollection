import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3002";
const SHOT_DIR = "/tmp/claude-1000/-home-pritesh-Desktop-webs-shibrah-backend/129b1162-bf55-46d9-9a11-504a3fce4e0a/scratchpad/shots-login";
fs.mkdirSync(SHOT_DIR, { recursive: true });
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const browser = await chromium.launch();

async function freshPage() {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on("pageerror", (err) => log("PAGE ERROR:", err.message));
  page.on("console", (msg) => { if (msg.type() === "error") log("CONSOLE ERROR:", msg.text()); });
  return { ctx, page };
}

try {
  // --- Staff login via the single /login page ---
  {
    const { ctx, page } = await freshPage();
    await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${SHOT_DIR}/01-unified-login-page.png` });
    await page.fill('input[type="email"]', "admin@gmail.com");
    await page.fill('input[type="password"]', "admin");
    await page.getByRole("button", { name: "LOGIN" }).click();
    await page.waitForURL("**/admin", { timeout: 15000 });
    log("STAFF: redirected to", page.url(), "- correct:", page.url().endsWith("/admin"));
    await page.screenshot({ path: `${SHOT_DIR}/02-staff-landed-on-admin.png` });
    await ctx.close();
  }

  // --- Customer login via the same /login page ---
  {
    const { ctx, page } = await freshPage();
    await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
    await page.fill('input[type="email"]', "customer@example.com");
    await page.fill('input[type="password"]', "customer123");
    await page.getByRole("button", { name: "LOGIN" }).click();
    await page.waitForURL("**/account", { timeout: 15000 });
    log("CUSTOMER: redirected to", page.url(), "- correct:", page.url().endsWith("/account"));
    await page.screenshot({ path: `${SHOT_DIR}/03-customer-landed-on-account.png` });

    // customer tries to hit /admin directly -> should bounce to /login (not staff)
    await page.goto(`${BASE}/admin`, { waitUntil: "networkidle" });
    log("CUSTOMER hitting /admin -> ended at:", page.url());
    await ctx.close();
  }

  // --- Guarded route redirect: visit /admin while logged out ---
  {
    const { ctx, page } = await freshPage();
    await page.goto(`${BASE}/admin/products`, { waitUntil: "networkidle" });
    log("Logged-out /admin/products -> ended at:", page.url());
    await page.screenshot({ path: `${SHOT_DIR}/04-guarded-redirect.png` });

    // login from here, should honor next= back to /admin/products since staff
    await page.fill('input[type="email"]', "admin@gmail.com");
    await page.fill('input[type="password"]', "admin");
    await page.getByRole("button", { name: "LOGIN" }).click();
    await page.waitForTimeout(2000);
    log("After login from guarded redirect -> ended at:", page.url());
    await ctx.close();
  }

  // --- Old routes should 404 ---
  {
    const { ctx, page } = await freshPage();
    const r1 = await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle" });
    log("/admin/login old route status:", r1.status());
    const r2 = await page.goto(`${BASE}/account/login`, { waitUntil: "networkidle" });
    log("/account/login old route status:", r2.status());
    await ctx.close();
  }

  log("DONE_LOGIN_VERIFY");
} catch (err) {
  log("FATAL ERROR:", err.message);
  console.log("SCRIPT_FAILED");
} finally {
  await browser.close();
}
