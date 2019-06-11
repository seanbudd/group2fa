import React from 'react';
import OTPGenerator from '../components/OTPGenerator'
import '../assets/App.css';

class SecretView extends React.Component {
  state = { manage: false }
  toggleManage = (event) => {
      this.setState(prevState => ({ manage: ! prevState.manage }));
  }
  render() {
    let details = this.state.manage ? 
    (<div>People</div>) : 
    (<button onClick={this.toggleManage}>Manage</button>)
    return (
    <div className="secretView">
      <h2>{this.props.name}</h2>
      <OTPGenerator secret={this.props.secret}/>
      {details}
    </div>
  );
  }
}

export default SecretView;
