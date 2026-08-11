import { describe, it, expect } from "vitest";
import {
  projects,
  services,
  processSteps,
  whyItems,
  testimonials,
  stats,
  navLinks,
  socials,
} from "@/lib/data";

describe("data exports", () => {
  it("exports projects array", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    projects.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.image).toBeTruthy();
      expect(Array.isArray(p.stack)).toBe(true);
      expect(Array.isArray(p.metrics)).toBe(true);
    });
  });

  it("exports services array", () => {
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
  });

  it("exports process steps", () => {
    expect(Array.isArray(processSteps)).toBe(true);
    expect(processSteps.length).toBe(6);
  });

  it("exports why items", () => {
    expect(Array.isArray(whyItems)).toBe(true);
    expect(whyItems.length).toBeGreaterThan(0);
  });

  it("exports testimonials", () => {
    expect(Array.isArray(testimonials)).toBe(true);
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("exports stats", () => {
    expect(Array.isArray(stats)).toBe(true);
    expect(stats.length).toBeGreaterThan(0);
  });

  it("exports nav links", () => {
    expect(Array.isArray(navLinks)).toBe(true);
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it("exports socials", () => {
    expect(Array.isArray(socials)).toBe(true);
  });
});
