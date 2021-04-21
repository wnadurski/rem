import React, { ReactElement } from "react"

interface Props {
  children: ReactElement
}
const StarterEstate = ({ children }: Props): ReactElement => {
  return (
    <div>
      <h1>Estate template</h1>
      <p>Address: </p>
      <p>Cost: </p>
      <p>Tenant: </p>
      <img src="https://via.placeholder.com/150" />
      <p>Comments: </p>
      {children}
    </div>
  )
}

export default StarterEstate
