import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 120000,
  use: { baseURL: "http://127.0.0.1:3018", headless: true },
  workers: 2,
  webServer: {
    command: "PORT=3018 node audit/serve.cjs",
    url: "http://127.0.0.1:3018",
    reuseExistingServer: false,
  },
  reporter: [
    ["list"],
    ["json", { outputFile: "audit/playwright-results.json" }],
  ],
});
