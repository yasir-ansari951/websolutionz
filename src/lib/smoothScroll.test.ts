import { describe, it, expect, vi, beforeEach } from "vitest";
import { scrollToId, scrollToTop } from "./smoothScroll";

vi.mock("lenis", () => ({
  default: vi.fn(),
}));

describe("smoothScroll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("scrollToId does not throw when element not found", () => {
    expect(() => scrollToId("#nonexistent")).not.toThrow();
  });

  it("scrollToTop does not throw", () => {
    expect(() => scrollToTop()).not.toThrow();
  });
});
