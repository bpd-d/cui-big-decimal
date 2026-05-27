import { BigDecimalDefaultPrecision } from "./bigDecimal.constants";
import { isNil } from "./bigDecimal.helpers";
import { BigDecimalRoundingMode } from "./bigDecimal.rounding";
import { BigDecimalOptions } from "./bigDecimal.types";

export const BigDecimalDefaultOptions: BigDecimalOptions = {
  precision: BigDecimalDefaultPrecision,
  scale: BigDecimalDefaultPrecision,
  rounding: BigDecimalRoundingMode.HALF_UP,
} as const;

const objectKeys = <T extends {}>(obj: T): (keyof T)[] =>
  Object.keys(obj) as (keyof T)[];

export const initBigDecimalOptions = (
  options?: Partial<BigDecimalOptions>,
): BigDecimalOptions => {
  if (isNil(options)) {
    return { ...BigDecimalDefaultOptions };
  }

  return objectKeys(BigDecimalDefaultOptions).reduce<BigDecimalOptions>(
    (acc, key) => {
      acc[key] = (options[key] ?? BigDecimalDefaultOptions[key]) as any;
      return acc;
    },
    {} as BigDecimalOptions,
  );
};
