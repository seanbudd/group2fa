import React from 'react';
import '../assets/App.css';
import Login from './Login'
import CreateUser from './CreateUser'
import UserSecrets from './UserSecrets';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user_id: null};
  }

  render() {
    let content = this.state.user_id != null ? 
          (<UserSecrets current_user_id={this.state.user_id} />)
          : (<div><CreateUser parent = {this} /> <Login parent = {this} /></div>)
    return (
      <div className="App">
      <header className="App-header">
        {content}
      </header>
      </div>
    )
  }
}

export default App;
