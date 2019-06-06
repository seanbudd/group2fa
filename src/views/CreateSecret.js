import React from 'react';
import '../assets/App.css';

class CreateSecret extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form_data: {secret: '', secret_name: '', user_id: props.current_user_id}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let new_form_data = this.state.form_data;
    new_form_data[event.target.name] = event.target.value;
    this.setState({form_data: new_form_data});
  }

  handleSubmit(event) {
    fetch('/create_secret', {
      method: 'POST',
      body: JSON.stringify(this.state.form_data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(
      res => res.json().then(data => this.props.parent.setState(prevState => ({
        secrets: [...prevState.secrets, data.secret]
      })))
    )
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Secret Name:
          <input type="text" name="secret_name" value={this.state.secret_name} onChange={this.handleChange} />
          Secret:
          <input type="text" name="secret" value={this.state.secret} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default CreateSecret;
