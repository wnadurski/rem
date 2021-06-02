import { Address } from "../address"
import { Tenant } from "../tenants/Tenant"
import { Price } from "../currency/Price"
import { Image } from "../image/Image"
import { Id } from "../id/Id"

export interface Position {
  name: string
  price: Price
  monthsPerYear: number
}

export interface Estate {
  id: Id
  name: string
  image?: Image
  address: Address
  tenants: Tenant[]
  expenses: Position[]
  incomes: Position[]
}
