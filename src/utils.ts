import { LEADING_TRAILING_ZEROS_REGEX } from "./constants";

export const toBigInt = (value: any, precision: number, rounded: boolean) => {
  const [ints, decimals] = String(value).split(".").concat("");
  return (
    BigInt(ints + decimals.padEnd(precision, "0").slice(0, precision)) +
    BigInt(rounded && decimals[precision] >= "5")
  );
};

export const convertToString = (value: bigint, precision: number) => {
  const stringVal = prepareValue(value, precision);
  const trimmedValue = trimValue(stringVal, precision);
  return value < 0 ? `-${trimmedValue}` : trimmedValue;
}

const prepareValue = (value: bigint, precision: number) => {
  return value
    .toString()
    .replace("-", "")
    .padStart(precision + 1, "0");
}

const trimValue = (value: string, precision: number) => {
  return (value.slice(0, -precision) + "." + value.slice(-precision)).replace(
    LEADING_TRAILING_ZEROS_REGEX,
    ""
  );
}