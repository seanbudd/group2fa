import React from 'react'
import { Component } from 'react'

class SecretDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      one_time_secret: null
    }

    this.toggleSecure = this.toggleSecure.bind(this)
  }
  toggleSecure (event) {
    fetch('/toggle_secure', {
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.current_user_id,
        secret_id: this.props.secret_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res =>
      res
        .json()
        .then(data => this.setState({ one_time_secret: data.one_time_secret }))
    )
  }
  render () {
    let one_time_secret_div = this.state.one_time_secret ? (
      <label>
        Here's your access secret, make sure to save this to your MFA (eg Google
        Authenticator):
        <textarea readOnly='true'>{this.state.one_time_secret}</textarea>
      </label>
    ) : null
    return (
      <div className='SecretDetails'>
        <input type='submit' value='Make Secure' onClick={this.toggleSecure} />
        {one_time_secret_div}
      </div>
    )
  }
}

export default SecretDetails
