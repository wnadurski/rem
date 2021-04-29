import React, { ReactElement, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card } from "antd"
import { Estate, getEstates } from "./services"

const ListedEstates = (): ReactElement => {
  const [estates, setEstates] = useState<undefined | Estate[]>(undefined)
  useEffect(() => {
    getEstates().then(setEstates)
  }, [])
  return (
    <div>
      <div>Your estates:</div>

      {estates
        ? estates.map((estate) => {
            return (
              <Card
                title={estate.name}
                extra={<Link to={`/estates/${estate.id}`}>Details</Link>}
              >
                <div className="flex-row">
                  <img
                    src="https://via.placeholder.com/150"
                    className="miniature"
                  />
                  <div>
                    <p>Address: {estate.address}</p>
                    <p>Cost: {estate.cost}</p>
                    <p>Tenant: {estate.tenant}</p>
                    <p>Rented until: {estate.until}</p>
                  </div>
                </div>
              </Card>
            )
          })
        : undefined}
      <Link to="/estates/add">Add estates </Link>
      <Link to="/">Home</Link>
    </div>
  )
}

export default ListedEstates
