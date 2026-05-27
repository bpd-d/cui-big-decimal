import { BigDecimalRoundingFunction } from "./bigDecimal.types";

const bigDecimalHalfUp: BigDecimalRoundingFunction = (v: number) => {
  return BigInt(v >= 5);
};

const bigDecimalHalfDown: BigDecimalRoundingFunction = (v: number) => {
  return v <= 5 ? -1n : 0n;
};

const bigDecimalFloor: BigDecimalRoundingFunction = () => {
  return -1n;
};

const bigDecimalCeil: BigDecimalRoundingFunction = (_v: number) => {
  return 1n;
};

export const BigDecimalRoundingMode: Record<
  string,
  BigDecimalRoundingFunction
> = {
  HALF_UP: bigDecimalHalfUp,
  HALF_DOWN: bigDecimalHalfDown,
  FLOOR: bigDecimalFloor,
  CEIL: bigDecimalCeil,
} as const;
