import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./src/tests/tests/setup.js"],
    testTimeout: 20000,
    clearMocks: true,
  },
});