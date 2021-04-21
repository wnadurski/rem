import { render, screen } from "@testing-library/react"
import React from "react"
import ListedEstates from "../estates/ListedEstates"

test("renders estates list; add estates and home buttons", () => {
  render(<ListedEstates />)

  const welcomeText = screen.getByText("Your estates:")
  const addEstates = screen.getByText("Add estates")
  const goHome = screen.getByText("Home")

  expect(welcomeText).toBeInTheDocument()
  expect(addEstates).toBeInTheDocument()
  expect(goHome).toBeInTheDocument()
})
