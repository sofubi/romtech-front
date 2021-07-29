import React, { Component } from 'react';
import { request, handleChange } from '../utils/handlers';

export default class QuoteList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      quoteList: [],
      count: 1,
    };
  }

  async fetchQuotes() {
    const { cookies } = this.props;

    let quote;

    await request(`quotes?count=${this.state.count}`, 'GET', cookies.get('userToken'))
      .then(response => response.json())
      .then(data => {
        quote = data;
      })
  
    return quote;
  }

  async componentDidMount() {
    let quotes = await this.fetchQuotes();
    console.log(quotes)
    this.setState({
      quoteList: quotes
    });
  }

  async handleSubmit(e) {
    e.preventDefault()

    let quotes = await this.fetchQuotes();
    this.setState({
      quoteList: quotes
    })
  }

  currentQuotes() {
    let quoteElements = '';
    this.state.quoteList.forEach(q => {
      quoteElements += '<h1>' + q.quote + '</h1>'
    });
    return quoteElements;
  }

  render() {
    return (
      <div>
        <div className='content' dangerouslySetInnerHTML={{__html: this.currentQuotes()}}></div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Count:
            <input type='number' name='count' onChange={handleChange.bind(this)} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}
