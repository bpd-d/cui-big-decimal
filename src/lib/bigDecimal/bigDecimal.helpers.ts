import { LEADING_TRAILING_ZEROS_REGEX } from "./bigDecimal.constants";
import {
  BigDecimalOptions,
  BigDecimalRoundingFunction,
} from "./bigDecimal.types";

export const isNull = (v: unknown): v is null => v === null;
export const isUndefined = (v: unknown): v is undefined =>
  typeof v === "undefined";

export const isNil = (v: unknown): v is null | undefined =>
  isUndefined(v) || isNull(v);

/**
 * Adds leading zeros to value to match given precision
 * @param value - bigint - value converted to string
 * @param precision - given precision
 * @returns string representation of given value with zeros added
 */
const prepareValue = (value: bigint, precision: number) => {
  return value
    .toString()
    .replace("-", "")
    .padStart(precision + 1, "0");
};

const getStringDecimalValue = (value: string, precision: number) =>
  value.slice(0, -precision) + "." + value.slice(-precision);

const trimValue = (value: string, precision: number) => {
  return getStringDecimalValue(value, precision).replace(
    LEADING_TRAILING_ZEROS_REGEX,
    "",
  );
};

const adjustValueSign = (value: bigint, stringRepr: string) => {
  return `${value < 0 ? "-" : ""}${stringRepr}`;
};

export const toNumber = (
  v: string | undefined | null,
  defaultValue: number = 0,
) => {
  if (isNil(v)) {
    return defaultValue;
  }

  const number = parseInt(v);

  if (isNaN(number)) {
    return defaultValue;
  }

  return number;
};

export const toBigInt = (
  value: any,
  precision: number,
  roundingMode: BigDecimalRoundingFunction,
) => {
  const [ints, decimals] = String(value).split(".").concat("");
  const valueAtPrecision = toNumber(decimals[precision], 0);
  const roundingValue = roundingMode(valueAtPrecision);
  return (
    BigInt(ints + decimals.padEnd(precision, "0").slice(0, precision)) +
    roundingValue
  );
};

export const convertToString = (value: bigint, precision: number) => {
  const stringVal = prepareValue(value, precision);
  const trimmedValue = trimValue(stringVal, precision);
  return adjustValueSign(value, trimmedValue);
};

export const convertToStringWithScale = (
  value: bigint,
  options: BigDecimalOptions,
) => {
  const stringVal = prepareValue(value, options.precision);
  const decimalValue = getStringDecimalValue(stringVal, options.precision);
  console.log({
    stringVal,
    decimalValue,
  });
  return decimalValue;
};

const calculateRoundingFactor = (v1: bigint, v2: bigint) => {
  return ((v1 * 2n) / v2) % 2n;
};

export const divRound = (
  dividend: bigint,
  divisor: bigint,
  roundingMode: BigDecimalRoundingFunction,
) => {
  return dividend / divisor + calculateRoundingFactor(dividend, divisor);
};

export const calculateShift = (precision: number) => {
  return BigInt("1" + "0".repeat(precision));
};

/**
 * Performs division operation of two values with specified precision and rounding strategy
 * @param {bigint} dividend - current value
 * @param {bigint} divisor - value which current value is divided by
 * @param {BigDecimalOptions} options - big decimal options
 * @returns result of math division
 */
export const bigIntDivide = (dividend: bigint, divisor: bigint, options: BigDecimalOptions) => {
  const shift = calculateShift(options.precision);
  return divRound(dividend * shift, divisor, options.rounding);
}

/**
 * Performs multiply operation of two values with specified precision and rounding strategy
 * @param {bigint} value 
 * @param {bigint} mulitplier 
 * @param {BigDecimalOptions} options 
 * @returns result of math mulitplication
 */
export const bigIntMultiply = (value: bigint, mulitplier: bigint, options: BigDecimalOptions) => {
  const shift = calculateShift(options.precision);
  return divRound(value * mulitplier, shift, options.rounding);
}
