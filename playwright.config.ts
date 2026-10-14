import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 120000,
  use: { baseURL: "http://127.0.0.1:3021", headless: true },
  workers: 2,
  webServer: {
    command: "PORT=3021 node audit/serve.cjs",
    url: "http://127.0.0.1:3021",
    reuseExistingServer: false,
  },
  reporter: [
    ["list"],
    ["json", { outputFile: "audit/playwright-results.json" }],
  ],
});
