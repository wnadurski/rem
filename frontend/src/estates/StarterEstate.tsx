import React, { ReactElement } from "react"
import { useParams } from "react-router-dom"

interface Props {
  children: ReactElement
}
const StarterEstate = ({ children }: Props): ReactElement => {
  const { id } = useParams<{ id?: string }>()
  return (
    <div>
      <h1>Estate template</h1>
      <p>Address: </p>
      <p>Cost: </p>
      <p>Tenant: </p>
      <img src="https://via.placeholder.com/150" />
      <p>Comments: {id}</p>
      {children}
    </div>
  )
}

export default StarterEstate
