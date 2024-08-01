import React from 'react'
import { Component } from 'react'

class OTPGenerator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: !this.props.secure,
      mfa_token: null,
      current_token: null
    }

    this.getTOTP()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (event) {
    this.setState({ mfa_token: event.target.value, ready: true })
  }
  getTOTP () {
    if (this.state.ready) {
      fetch('/get_totp', {
        method: 'POST',
        body: JSON.stringify({
          user_id: this.props.current_user_id,
          mfa_token: this.state.mfa_token,
          secret_id: this.props.secret_id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res =>
        res.json().then(data => this.setState({ current_token: data.totp }))
      )
    }
  }
  componentDidMount () {
    this.interval = setInterval(() => this.getTOTP(), 3000)
  }
  componentWillUnmount () {
    clearInterval(this.interval)
  }
  render () {
    const mfa_field = this.state.ready ? null : (
      <input type='text' name='mfa' onChange={this.handleChange} />
    )
    return (
      <div className='OTPGenerator'>
        <p>{this.state.current_token}</p>
        {mfa_field}
      </div>
    )
  }
}

export default OTPGenerator
