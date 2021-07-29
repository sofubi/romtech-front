import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { handleChange, request } from '../utils/handlers';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    const { cookies } = this.props;

    e.preventDefault()  

    await request('login', 'POST', undefined, {
      'email': this.state.email,
      'password': this.state.password,
    })
      .then(response => response.json())
      .then(data => cookies.set('userToken', data.token))
      .then(this.setState({ redirect: true }));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/quotes" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" onChange={handleChange.bind(this)}/>
        </label>
        <label>
          Password:
          <input type="text" name="password" onChange={handleChange.bind(this)}/>
        </label>
        <input type="submit" value="submit" />
      </form>
    );
  }
}
