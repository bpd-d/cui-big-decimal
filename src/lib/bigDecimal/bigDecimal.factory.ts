import { BigDecimalOptions } from "./bigDecimal.types";

class BigDecimalFactory {
    #options: BigDecimalOptions | undefined;
    constructor(options?: BigDecimalOptions) {
        this.#options = options
    }
}