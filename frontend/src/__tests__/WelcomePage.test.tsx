import { render, screen } from "@testing-library/react"
import React from "react"
import { Link } from "react-router-dom"
import WelcomePage from "../pages/WelcomePage"

test("renders Hi and a log out button", () => {
  render(
    <WelcomePage>
      <Link to="/estates">View estates</Link>
    </WelcomePage>
  )

  const textHi = screen.getByText("Hi, stranger")
  const outButton = screen.getByText("Log out")
  expect(textHi).toBeInTheDocument()
  expect(outButton).toBeInTheDocument()
})
