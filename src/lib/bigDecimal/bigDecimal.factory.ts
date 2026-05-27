import { BigDecimal } from "./bigDecimal";
import { BigDecimalInput, BigDecimalOptions } from "./bigDecimal.types";

/**
 * Factory function for BigDecimals. Simplifies process of creating new BigDecimals with the same options
 * @param {BigDecimalOptions} options - big decimal options 
 * @returns BigDecimal creator function
 */
export const BigDecimalFactory = (options?: BigDecimalOptions) => (value: BigDecimalInput) => {
    return new BigDecimal(value, options);
}