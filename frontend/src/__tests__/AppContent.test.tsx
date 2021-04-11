import { render, screen } from "@testing-library/react"
import React from "react"
import AppContent from "../auth/AppContent"

test("renders Hi and a log out button", () => {
  render(
    <AppContent
      logOut={() => {
        return 1
      }}
    />
  )

  const textHi = screen.getByText(
    "Hi, your token has been saved in local storage"
  )
  const outButton = screen.getByText("Log out")

  expect(textHi).toBeInTheDocument()
  expect(outButton).toBeInTheDocument()
})
