import { Country } from "../../../../shared/src/country"

export interface Address {
  country?: Country
  zipCode: string // or postal code
  address: string
}
