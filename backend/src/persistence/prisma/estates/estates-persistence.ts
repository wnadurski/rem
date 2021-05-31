import { EstatesPersistence } from "../../../core/estates/EstatesPersistence"
import { prisma } from "../client"
import { parseId, showId } from "../../../core/id/Id"
import { Address as AddressDB, Position as PositionDB } from "@prisma/client"
import { pipe } from "fp-ts/lib/function"
import * as A from "fp-ts/Array"
import * as O from "fp-ts/Option"
import { Address } from "../../../core/address"
import { parseCountry } from "../../../../../shared/src/country"
import { Position } from "../../../core/estates/Estate"
import { omit } from "ramda"
import {
  CurrencyCode,
  parseCurrency,
} from "../../../../../shared/src/CurrencyCode"

const emptyAddress: Address = {
  country: undefined,
  zipCode: "",
  address: "",
}

const addressFromDb = (address: AddressDB): Address => ({
  ...address,
  country: parseCountry(address.country),
})

const positionFromDb = (position: PositionDB): Position => ({
  ...omit(["priceValue", "priceCurrency"], position),
  price: {
    value: position.priceValue as any,
    currency: parseCurrency(position.priceCurrency) ?? CurrencyCode.PLN,
  },
})

export const estatesPersistence: EstatesPersistence = {
  getEstatesForUser: (userId) => async () => {
    const estates = await prisma.estate.findMany({
      where: { ownerId: showId.show(userId) },
      include: {
        image: { include: { resolutions: true } },
        address: true,
        tenants: true,
        incomes: true,
        expenses: true,
      },
    })

    return pipe(
      estates,
      A.map((e) => ({
        ...e,
        image: e.image ?? undefined,
        address: e.address ? addressFromDb(e.address) : emptyAddress,
        incomes: e.incomes.map(positionFromDb),
        expenses: e.expenses.map(positionFromDb),
      })),
      A.map((e) =>
        pipe(
          e.id,
          parseId.parse,
          O.map((id) => ({ ...e, id }))
        )
      ),
      O.sequenceArray,
      O.getOrElseW(() => [])
    )
  },
}
