export interface Estate {
  id: string
  name: string
  address: string
  cost: string
  tenant: string
  until: string
}

const estatesList: Estate[] = [
  {
    id: "1",
    name: "garaz",
    address: "Sloneczna 11",
    cost: "1000",
    tenant: "nikt",
    until: "01.01.2022",
  },
  {
    id: "2",
    name: "kwiaciarnia",
    address: "Ksiezycowa 2",
    cost: "500",
    tenant: "ktos",
    until: "31.12.2021",
  },
]

export async function getEstates(): Promise<Estate[] | undefined> {
  return Promise.resolve(estatesList)
}
