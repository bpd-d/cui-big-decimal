import { toBigInt } from "./utils";

type BigDecimalPropAllowedTypes = number | string | bigint | BigDecimal;

const LEADING_TRAILING_ZEROS_REGEX = /(\.0*|0+)$/;

export class BigDecimal {
  static PRECISION = 18;
  static ROUNDED = true;

  value: bigint = 0n;

  constructor(value: BigDecimalPropAllowedTypes) {
    if (value instanceof BigDecimal) {
      return value;
    }

    if (typeof value === "bigint") {
      this.value = value;
      return this;
    }

    this.value = toBigInt(value, BigDecimal.PRECISION, BigDecimal.ROUNDED);
  }

  get #shift() {
    return BigInt("1" + "0".repeat(BigDecimal.PRECISION));
  }

  #divRound(dividend: bigint, divisor: bigint) {
    return new BigDecimal(
      dividend / divisor +
        (BigDecimal.ROUNDED ? ((dividend * 2n) / divisor) % 2n : 0n)
    );
  }

  add(num: BigDecimalPropAllowedTypes) {
    return new BigDecimal(this.value + new BigDecimal(num).value);
  }

  subtract(num: BigDecimalPropAllowedTypes) {
    return new BigDecimal(this.value - new BigDecimal(num).value);
  }

  multiply(num: BigDecimalPropAllowedTypes) {
    return this.#divRound(this.value * new BigDecimal(num).value, this.#shift);
  }

  divide(num: BigDecimalPropAllowedTypes) {
    return this.#divRound(this.value * this.#shift, new BigDecimal(num).value);
  }

  valueOf() {
    return this.value;
  }

  equalTo(v: BigDecimal) {
    return this.value === v.value;
  }

  toString() {
    const precision = BigDecimal.PRECISION;
    let s = this.value
      .toString()
      .replace("-", "")
      .padStart(precision + 1, "0");
    s = (s.slice(0, -precision) + "." + s.slice(-precision)).replace(
      LEADING_TRAILING_ZEROS_REGEX,
      ""
    );
    return this.value < 0 ? "-" + s : s;
  }
}
