import React from 'react';
import logo from './img/logo.svg';
import './css/App.css';
import GoogleButton from 'react-google-button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <GoogleButton type="light"/>
      </header>
    </div>
  );
}

export default App;
