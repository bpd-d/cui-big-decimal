import { describe, expect, test } from "vitest";

import { BigDecimal } from "./bigDecimal";

describe("BigDecimal", () => {
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

  test("handles zero", () => {
    const value = new BigDecimal("0");
    expect(value.toString()).toBe("0");
  });

  test("Handles > operator - true", () => {
    const value1 = new BigDecimal("1.01");
    const value2 = new BigDecimal("1.02");

    expect(value2 > value1).toBe(true);
  });

  test("Handles > operator - false", () => {
    const value1 = new BigDecimal("1.01");
    const value2 = new BigDecimal("1.02");

    expect(value1 > value2).toBe(false);
  });

  test("Handles < operator - true", () => {
    const value1 = new BigDecimal("1.01");
    const value2 = new BigDecimal("1.02");

    expect(value1 < value2).toBe(true);
  });

  test("Handles < operator - false", () => {
    const value1 = new BigDecimal("1.01");
    const value2 = new BigDecimal("1.02");

    expect(value2 < value1).toBe(false);
  });
});

describe("BigDecimal - add", () => {
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

  test("Adds large numbers", () => {
    const value = new BigDecimal("9000000000000000000.001");
    const result = value.add("8000000000000000.0001");

    expect(result.toString()).toEqual("9008000000000000000.0011");
  });
});

describe("BigDecimal - subtract", () => {
  test("Subtracts numbers with different precision", () => {
    const value = new BigDecimal("900000.1001");
    const result = value.subtract("8000.99");

    expect(result.toString()).toBe("891999.1101");
  });

  test("Handles negative numbers", () => {
    const value = new BigDecimal(
      "-90000000000000000000000000.00012323214444122"
    );
    const result = value.subtract("8000.000099");

    expect(result.toString()).toBe(
      "-90000000000000000000008000.00022223214444122"
    );
  });
});

describe("BigDecimal - multiply", () => {
  test("Calculates properly two values", () => {
    const value = new BigDecimal("152.23");
    const result = value.multiply("23.89");

    expect(result.toString()).toEqual("3636.7747");
  });

  test("Calculates values with different precision", () => {
    const value = new BigDecimal("1523122.23929");
    const result = value.multiply("9902.553221");

    expect(result.toString()).toEqual("15082799036.65792225309");
  });
});

describe("BigDecimal - divide", () => {
  test("Divides two numbers properly", () => {
    const value = new BigDecimal("1523122.23929");
    const result = value.divide("2");

    expect(result.toString()).toEqual("761561.119645");
  });

  test("Handles negative numbers", () => {
    const value = new BigDecimal("1523122.23929");
    const result = value.divide("-2");

    expect(result.toString()).toEqual("-761561.119645");
  });

  test("Handles larger precision", () => {
    const value = new BigDecimal("1523122.23929");
    const result = value.divide("-2.1");

    expect(result.toString()).toEqual("-725296.304423809523809524");
  });
});
