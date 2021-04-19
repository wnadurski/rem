import React, { ReactElement } from "react"

interface Props {
  children: ReactElement
}

const ListedEstates = ({ children }: Props): ReactElement => {
  return (
    <div>
      <div>Hello world</div>
      {children}
    </div>
  )
}

export default ListedEstates
