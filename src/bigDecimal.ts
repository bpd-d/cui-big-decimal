import { convertToString, toBigInt } from "./utils";

type BigDecimalPropAllowedTypes = number | string | bigint | BigDecimal;

const divRound = (dividend: bigint, divisor: bigint, isRounded: boolean) => {
  return new BigDecimal(
    dividend / divisor +
      (isRounded ? ((dividend * 2n) / divisor) % 2n : 0n)
  );
}

export class BigDecimal {
  static PRECISION = 18;
  static ROUNDED = true;

  #value: bigint = 0n;

  constructor(value: BigDecimalPropAllowedTypes) {
    if (value instanceof BigDecimal) {
      return value;
    }

    if (typeof value === "bigint") {
      this.#value = value;
      return this;
    }

    this.#value = toBigInt(value, BigDecimal.PRECISION, BigDecimal.ROUNDED);
  }

  get #shift() {
    return BigInt("1" + "0".repeat(BigDecimal.PRECISION));
  }

  add(num: BigDecimalPropAllowedTypes) {
    return new BigDecimal(this.#value + new BigDecimal(num).toBigInt());
  }

  subtract(num: BigDecimalPropAllowedTypes) {
    return new BigDecimal(this.#value - new BigDecimal(num).toBigInt());
  }

  multiply(num: BigDecimalPropAllowedTypes) {
    return divRound(this.#value * new BigDecimal(num).toBigInt(), this.#shift, BigDecimal.ROUNDED);
  }

  divide(num: BigDecimalPropAllowedTypes) {
    return divRound(this.#value * this.#shift, new BigDecimal(num).toBigInt(), BigDecimal.ROUNDED);
  }

  toBigInt() {
    return this.#value;
  }

  equalTo(v: BigDecimal) {
    return this.equals(v);
  }

  equals(v: BigDecimal) {
    return this.#value === v.toBigInt();
  }

  toString() {return convertToString(this.#value, BigDecimal.PRECISION)}
}