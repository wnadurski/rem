import { Country } from "../country"

export interface AddressView {
  country?: Country
  zipCode: string // or postal code
  address: string
}
