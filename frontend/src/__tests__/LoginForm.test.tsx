import { render, screen } from "@testing-library/react"
import React from "react"
import LoginForm from "../auth/LoginForm"

test("renders 4 elements specified in LoginForm", () => {
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

//test("displays logged in user and token when they log in succesfully", () => {

//expect("Hi".toBeInTheDocument())
//})

//test("displays error message when login fails", () => {

//expect("error").toBeInTheDocument()
//})
