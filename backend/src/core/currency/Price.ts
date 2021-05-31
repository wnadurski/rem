import { CurrencyCode } from "../../../../shared/src/CurrencyCode"

export interface Price {
  currency: CurrencyCode
  value: number
}
