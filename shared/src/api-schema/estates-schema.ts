import { Endpoint, Schema } from "../ts-schema/schema"
import { TenantView } from "./tenants-schema"
import { AddressView } from "./addresses-schema"
import { PriceView } from "./prices-schema"
import { ImageView } from "./images-schema"

export interface PositionView {
  name: string
  price: PriceView
  monthsPerYear: number
}

export interface EstateElementView {
  name: string
  image?: ImageView
  address: AddressView
  tenants: TenantView[]
  expenses: PositionView[]
  incomes: PositionView[]
}

export interface EstatesListView {
  estates: EstateElementView[]
}

export type EstatesSchema = Schema<{
  listEstates: Endpoint<
    "/estates",
    "GET",
    undefined,
    {
      200: EstatesListView
      403: undefined
    }
  >
}>
