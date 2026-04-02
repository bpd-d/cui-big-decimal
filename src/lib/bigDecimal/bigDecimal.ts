import {
  calculateShift,
  convertToString,
  convertToStringWithScale,
  divRound,
  toBigInt,
} from "./bigDecimal.helpers";
import {
  BigDecimalDefaultOptions,
  initBigDecimalOptions,
} from "./bigDecimal.options";
import { BigDecimalRoundingMode } from "./bigDecimal.rounding";
import { BigDecimalInput, BigDecimalOptions } from "./bigDecimal.types";

export class BigDecimal {
  static PRECISION = 18;
  static ROUNDING_MODE = BigDecimalRoundingMode.HALF_UP;

  #value: bigint = 0n;
  #options: BigDecimalOptions = BigDecimalDefaultOptions;

  constructor(value: BigDecimalInput, options?: Partial<BigDecimalOptions>) {
    this.#options = initBigDecimalOptions(options);

    if (value instanceof BigDecimal) {
      return value;
    }

    if (typeof value === "bigint") {
      this.#value = value;
      return this;
    }

    this.#value = toBigInt(
      value,
      this.#options.precision,
      this.#options.rounding,
    );
  }

  get #shift() {
    return calculateShift(this.#options.precision);
  }

  static from(value: BigDecimalInput, options?: Partial<BigDecimalOptions>) {
    return new BigDecimal(value, options);
  }

  add(num: BigDecimalInput) {
    const bigDecimalNum = BigDecimal.from(num, this.#options).toBigInt();
    return BigDecimal.from(this.#value + bigDecimalNum, this.#options);
  }

  subtract(num: BigDecimalInput) {
    const bigDecimalValue = BigDecimal.from(num, this.#options).toBigInt();
    return new BigDecimal(this.#value - bigDecimalValue, this.#options);
  }

  multiply(num: BigDecimalInput) {
    return BigDecimal.from(
      divRound(
        this.#value * BigDecimal.from(num, this.#options).toBigInt(),
        this.#shift,
        this.#options.rounding,
      ),
    );
  }

  divide(num: BigDecimalInput) {
    return BigDecimal.from(
      divRound(
        this.#value * this.#shift,
        BigDecimal.from(num, this.#options).toBigInt(),
        this.#options.rounding,
      ),
    );
  }

  toBigInt() {
    return BigInt(this.#value);
  }

  equalTo(v: BigDecimal) {
    return this.equals(v);
  }

  equals(v: BigDecimal) {
    return this.#value === v.toBigInt();
  }

  toString() {
    return convertToString(this.#value, this.#options.precision);
  }

  asString(scale?: number) {
    const newScale = scale ?? this.#options.scale;

    return convertToStringWithScale(this.#value, {
      ...this.#options,
      scale: scale ?? this.#options.scale,
    });
  }

  setPrecision(precision: number) {
    this.#options.precision = precision;
    return this;
  }

  setScale(scale: number) {
    this.#options.scale = scale;
    return this;
  }
}
