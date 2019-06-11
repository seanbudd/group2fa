import React from 'react';
import '../assets/App.css';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form_data: {email: '', password: ''}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let new_form_data = this.state.form_data;
    new_form_data[event.target.name] = event.target.value;
    this.setState({form_data: new_form_data});
  }

  handleSubmit(event) {
    fetch('/create_user', {
      method: 'POST',
      body: JSON.stringify(this.state.form_data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(
      res => res.json().then(data => this.props.parent.setState({user_id: data.user_id}))
    )
    event.preventDefault();
  }

  render() {
    return (
      <div className="CreateUser">
      <h2> Create Account </h2>
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default CreateUser;
