import { vi, afterEach } from "vitest";

// FULL isolation per test
afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  vi.restoreAllMocks();
});