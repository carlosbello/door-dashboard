import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './components/Room';

const room1 = {
    name: "Baño cocina",
    doors: [
        {isOpen: false},
        {isOpen: true},
        {isOpen: true},
    ],
    isOpen: true
};
const room2 = {
    name: "Baño salones",
    doors: [
        {isOpen: false},
        {isOpen: true},
        {isOpen: false},
    ],
    isOpen: false
};
const rooms = [room1, room2];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Get shit done</h1>
        </header>
        <div className="App-intro">
            {rooms.map(({name, doors, isOpen}, idx) => <Room key={idx} name={name} doors={doors} isOpen={isOpen} />)}
        </div>
      </div>
    );
  }
}

export default App;
