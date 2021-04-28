import { render, screen } from "@testing-library/react"
import React from "react"
import EstateAdder from "../estates/EstateAdder"

test("renders add an estate button", () => {
  render(
    <EstateAdder>
      <div></div>
    </EstateAdder>
  )

  const addButton = screen.getByText("Add an estate")

  expect(addButton).toBeInTheDocument()
})
