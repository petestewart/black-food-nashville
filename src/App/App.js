import React from 'react';

import Console from '../components/Console/Console';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Console className="Console" />
      </div>
    );
  }
}

export default App;
