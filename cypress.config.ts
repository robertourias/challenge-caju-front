import { defineConfig } from "cypress";

export default defineConfig({  
  e2e: {
    fixturesFolder: "src/tests/fixtures",
    reporter: "spec",
    screenshotsFolder: "src/tests/screenshots",
    supportFolder: "false",
    video: false,
    videosFolder: "src/tests/videos",
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "src/tests/support/e2e.{js,jsx,ts,tsx}",
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
