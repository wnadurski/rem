import React from "react"
import { render, screen } from "@testing-library/react"
import LoginForm from "../LoginForm"

test("renders 4 elements specified in MyForm", () => {
  render(<LoginForm />)

  const usernameField = screen.getByPlaceholderText("Username")
  const passwordField = screen.getByPlaceholderText("Password")
  const submitButton = screen.getByText("Log in")
  const rememberMeText = screen.getByText("Remember me")

  expect(usernameField).toBeInTheDocument()
  expect(passwordField).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
  expect(rememberMeText).toBeInTheDocument()
})
