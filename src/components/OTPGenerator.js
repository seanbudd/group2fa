import React from 'react'
import { Component } from 'react'

class OTPGenerator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current_token: null
    }
  }
  componentDidMount () {
    this.interval = setInterval(
      () =>
        fetch('/get_totp', {
          method: 'POST',
          body: JSON.stringify({
            user_id: this.props.current_user_id,
            secret_id: this.props.secret_id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res =>
          res.json().then(data => this.setState({ current_token: data.totp }))
        ),
      3000
    )
  }
  componentWillUnmount () {
    clearInterval(this.interval)
  }
  render () {
    return (
      <div className='OTPGenerator'>
        <p>{this.state.current_token}</p>
      </div>
    )
  }
}

export default OTPGenerator
