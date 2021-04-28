import React, { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Card } from "antd"

interface Estate {
  id: string
  name: string
  address: string
  cost: string
  tenant: string
}

const ListedEstates = (): ReactElement => {
  const estatesList: Estate[] = [
    {
      id: "1",
      name: "garaz",
      address: "Sloneczna 11",
      cost: "1000",
      tenant: "nikt",
    },
    {
      id: "2",
      name: "kwiaciarnia",
      address: "Ksiezycowa 2",
      cost: "500",
      tenant: "ktos",
    },
  ]

  return (
    <div>
      <div>Your estates:</div>

      {estatesList.map((estate) => {
        return (
          <Card
            title={estate.name}
            extra={<Link to={`/estates/${estate.id}`}>Details</Link>}
          >
            <p>Address: {estate.address}</p>
            <p>Cost: {estate.cost}</p>
            <p>Tenant: {estate.tenant}</p>
          </Card>
        )
      })}
      <Link to="/estates/add">Add estates</Link>
      <Link to="/">Home</Link>
    </div>
  )
}

export default ListedEstates
