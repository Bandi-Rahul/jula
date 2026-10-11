import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["site.spec.ts", "pages.spec.ts"],
  timeout: 90000,
  expect: { timeout: 10000 },
  workers: 2,
  outputDir: ".build/ai/website/test-results",
  reporter: "list",
  use: {
    baseURL: process.env.TEST_BASE_URL ?? "http://localhost:3000",
    actionTimeout: 10000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "mobile",
      use: { viewport: { width: 360, height: 800 }, isMobile: true },
    },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
    { name: "wide", use: { viewport: { width: 1920, height: 1080 } } },
  ],
});
