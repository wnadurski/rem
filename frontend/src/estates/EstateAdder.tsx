import React, { ReactElement, useState } from "react"

interface Props {
  children: ReactElement
}

const EstateAdder = ({ children }: Props): ReactElement => {
  const [estate, setEstate] = useState("")

  return (
    <div>
      <form
        className="flex-column"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <label htmlFor="estate-name" className="field">
          <input
            className="text-input"
            id="estate-name"
            value={estate}
            placeholder="Name of estate"
            onChange={(e) => setEstate(e.target.value)}
            onBlur={(e) => setEstate(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-button">
          Add an estate
        </button>
      </form>
      {children}
    </div>
  )
}

export default EstateAdder
