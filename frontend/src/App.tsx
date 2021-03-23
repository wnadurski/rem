import React, { useState, ReactElement } from 'react';
import logo from './logo.svg';
import './App.css';
import MyForm from './MyForm'
import { render } from '@testing-library/react';

/*const App = () => {
  return(
    <div id ="root">
      <h1>Something</h1>
      <MyForm />

    </div>
  )
}*/

function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <MyForm />

      </header>
    </div>
  )
}

export default App
