import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

test('renders 4 elements specified in MyForm', () => {
  render(<App />)
  const usernameField = document.getElementById('username')
  const passwordField = document.getElementById('password')
  const submitButton = document.getElementsByClassName('submit-button')[0]
  const rememberMeText = screen.getByText('Remember me')
  expect(usernameField).toBeInTheDocument()
  expect(passwordField).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
  expect(rememberMeText).toBeInTheDocument()
})
