export const toBigInt = (value: any, precision: number, rounded: boolean) => {
  const [ints, decimals] = String(value).split(".").concat("");
  return (
    BigInt(ints + decimals.padEnd(precision, "0").slice(0, precision)) +
    BigInt(rounded && decimals[precision] >= "5")
  );
};
