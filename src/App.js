import React, { Component } from 'react';
import './App.css';
import logo from './img/logo.png';
import { CharacterSelect, Character } from './Character.js';
import characters from './Characters.js';


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="Logo-container"> 
          <img src={logo} className="logo" alt="logo"/>
        </div>
        
        <CharacterSelect characters={characters}/>
    </div>
    );
  }
}

export default App;
