import { render, screen } from "@testing-library/react"
import React from "react"
import ListedEstates from "../estates/ListedEstates"
import { HashRouter } from "react-router-dom"

test.skip("renders add estates and home buttons", () => {
  render(
    <HashRouter>
      <ListedEstates />
    </HashRouter>
  )

  const welcomeText = screen.getByText("Your estates:")
  const addEstates = screen.getByText("Add estates")
  const goHome = screen.getByText("Home")

  expect(welcomeText).toBeInTheDocument()
  expect(addEstates).toBeInTheDocument()
  expect(goHome).toBeInTheDocument()
})
