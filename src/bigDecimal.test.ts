import { describe, expect, test } from "vitest";

import { BigDecimal } from "./bigDecimal";

describe("Tests for BigDecimal", () => {
  test("Properly initializes from number", () => {
    const value = new BigDecimal(1);

    expect(value.toString()).toBe("1");
  });

  test("Properly initializes from string - trims tailing zeros", () => {
    const value = new BigDecimal("1.00");

    expect(value.toString()).toBe("1");
  });

  test("Properly initializes from bigint", () => {
    const value = new BigDecimal(1n);
    expect(value.toString()).toBe("0.000000000000000001");
  });

  test("Stores large numbers", () => {
    const value = new BigDecimal("10000000000000000.00000000000000001");
    expect(value.toString()).toBe("10000000000000000.00000000000000001");
  });

  test("Zero", () => {
    const value = new BigDecimal("0");
    expect(value.toString()).toBe("0");
  });
});

describe("BigDecimal > add", () => {
  test("Adds numbers with different precision", () => {
    const value = new BigDecimal("1000001.0000001");
    const result = value.add("1.00001");

    expect(result.toString()).toEqual("1000002.0000101");
  });

  test("Handles negative numbers", () => {
    const value = new BigDecimal("1.00");
    const result = value.add("-2.000");

    expect(result.toString()).toEqual("-1");
  });

  test("Handles negative numbers", () => {
    const value = new BigDecimal("1.00");
    const result = value.add("-2.000");

    expect(result.toString()).toEqual("-1");
  });
});
