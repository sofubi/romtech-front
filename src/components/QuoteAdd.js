import React, { Component } from 'react';
import { handleChange, request } from '../utils/handlers'

export default class QuoteAdd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      password: '',
    };
  }

  async addQuote() {
    const { cookies } = this.props;

    await request('quotes', 'POST', cookies.get('userToken'), {
      'quote': this.state.quote,
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  async handleSubmit(e) {
    e.preventDefault()

    await this.addQuote()
  }

  addQuotePage() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Quote: 
          <input type='text' name='quote' onChange={handleChange.bind(this)} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }

  passwordPage() {
    return (
      <div>
        <h1>Please Enter Password to Add Quote</h1>
        <form onSubmit={this.handlePassword.bind(this)}>
          <label>
            Password: 
            <input type='password' name='password' onChange={handleChange.bind(this)} />
          </label>
        </form>
      </div>
    )
  }

  handlePassword(e) {
    e.preventDefault();
    console.log(e);
    this.setState({ password: e.target.value })
  }

  render() {
    if (this.state.password !== 'ElonQuotes123!') {
      return this.passwordPage()
    }

    return this.addQuotePage()
  }
}
