import React, { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Card } from "antd"

const ListedEstates = (): ReactElement => {
  return (
    <div>
      <div>Your estates:</div>
      <Card
        title="Name of estate"
        extra={<Link to="/estates/StarterEstate">Details</Link>}
      >
        <p>Address: </p>
        <p>Cost: </p>
        <p>Tenant: </p>
      </Card>
      <Link to="/estates/add">Add estates</Link>
      <Link to="/">Home</Link>
    </div>
  )
}

export default ListedEstates
