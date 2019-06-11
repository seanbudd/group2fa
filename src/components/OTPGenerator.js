import React from 'react';
import { Component } from 'react';
import { TOTP } from '@akanass/rx-otp';

class OTPGenerator extends Component {
    constructor(props){
      super(props);
      this.state = { current_token : null, time: Date.now(), secret: props.secret };
    }
    componentDidMount() {
      this.interval = setInterval(() =>
        TOTP.generate(this.state.secret, { code_digits: 6, algorithm: 'SHA1' })
            .subscribe(token => this.setState({ current_token: token, time: Date.now() }) ),
      500);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    render () {
      return (
        <div className="OTPGenerator">
          <p>
            {this.state.current_token}
          </p>
        </div>
      )
    }
  }

export default OTPGenerator;
