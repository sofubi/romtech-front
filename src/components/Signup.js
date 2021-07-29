import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { handleChange, request  } from '../utils/handlers';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      redirect: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault()
    await request('register', 'POST', undefined, {
      'name': this.state.name,
      'email': this.state.email,
      'password': this.state.password,
      'password_confirmation': this.state.password_confirmation,
    })
      .then(this.setState({ redirect: true }));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name (first + last):
          <input required type="text" name="name" onChange={handleChange.bind(this)} />
        </label>
        <label>
          Email:
          <input required type="email" name="email" onChange={handleChange.bind(this)} />
        </label>
        <label>
          Password:
          <input required type="password" name="password" onChange={handleChange.bind(this)} />
        </label>
        <label>
          Password Confirmation:
          <input required type="password" name="password_confirmation" onChange={handleChange.bind(this)} />
        </label>
        <input type="submit" value="submit" />
      </form>
    );
  }
}
