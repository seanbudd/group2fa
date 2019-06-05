import React from 'react';
import Secret from '../models/secret'
import SecretView from './secret'
import '../assets/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Secrets</h1>
        {[123432, 56423, 214352342, 23454243].map(s => <SecretView {...new Secret({thing1: s})} />)
        }
      </header>
    </div>
  );
}

export default App;
