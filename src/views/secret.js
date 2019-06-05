import React from 'react';
import OTPGenerator from '../components/OTPGenerator'
import '../assets/App.css';

function SecretView(props) {
  return (
    <div className="secretView">
      <h2>{props.name}</h2>
      <OTPGenerator secret={props.secret}/>
    </div>
  );
}

export default SecretView;
