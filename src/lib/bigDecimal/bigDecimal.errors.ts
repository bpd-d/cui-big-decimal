export class BigDecimalError extends Error {
  constructor(message: string, name?: string) {
    super(message);
    this.name = name ?? "BigDecimalError";
  }
}

export class BigDecimalNumberError extends BigDecimalError {
  constructor(message: string) {
    super(message, "BigDecimalNumberError");
  }
}
