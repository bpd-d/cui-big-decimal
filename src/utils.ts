const LEADING_TRAILING_ZEROS_REGEX = /(\.0*|0+)$/;

export const toBigInt = (value: any, precision: number, rounded: boolean) => {
  const [ints, decimals] = String(value).split(".").concat("");
  return (
    BigInt(ints + decimals.padEnd(precision, "0").slice(0, precision)) +
    BigInt(rounded && decimals[precision] >= "5")
  );
};

export const bigIntToDecimalString = (
  value: bigint,
  precision: number,
  scale?: number
) => {
  const rawString = value
    .toString()
    .replace("-", "")
    .padStart(precision + 1, "0");
  const intPoint = rawString.slice(0, -precision);
  const decimalPoint = rawString.slice(-precision);

  const decimal =
    scale === undefined || scale >= precision
      ? decimalPoint
      : decimalPoint.slice(0, scale);
  const decimalString = `${intPoint}.${decimal}`;

  const trimmedString = decimalString.replace(LEADING_TRAILING_ZEROS_REGEX, "");
  return value < 0 ? `-${trimmedString}` : trimmedString;
};
