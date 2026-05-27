import { BigDecimal } from "./bigDecimal";

export type BigDecimalInput = number | string | bigint | BigDecimal;
export type BigDecimalRoundingFunction = (v: number) => bigint;

export type BigDecimalOptions = {
  precision: number;
  rounding: BigDecimalRoundingFunction;
  scale: number;
};
