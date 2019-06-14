import React from 'react'
import SecretView from './Secret'
import CreateSecret from './CreateSecret'
import '../assets/App.css'

class UserSecrets extends React.Component {
  constructor (props) {
    super(props)
    this.state = { secrets: [] }
    fetch('/get_secrets', {
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.current_user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res =>
      res
        .json()
        .then(data =>
          this.setState({ secrets: data.secrets.map(s => s.secret) })
        )
    )
  }
  render () {
    return (
      <div className='UserSecrets'>
        <header className='UserSecrets-header'>
          <h1>Your Secrets</h1>
          {this.state.secrets.map(s => (
            <SecretView {...s} />
          ))}
          <h2>Create Secret</h2>
          {<CreateSecret parent={this} {...this.props} />}
        </header>
      </div>
    )
  }
}

export default UserSecrets
