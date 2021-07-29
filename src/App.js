import './App.css';
import React, { Component } from 'react';
import QuoteList from './components/QuoteList';
import Login from './components/Login';
import Signup from './components/Signup'
import QuoteAdd from './components/QuoteAdd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class App extends Component {
  static proptTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    const { cookies } = this.props;

    return (
      <Router>
        <div className="App">
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/quotes">Quotes</Link>
          <Link to="/add">Add Quotes</Link>
        </div>

        <Switch>
          <Route exact path="/">
            <Login cookies={cookies} />
          </Route>
          <Route path="/quotes">
            <QuoteList cookies={cookies} />
          </Route>
          <Route path="/add">
            <QuoteAdd cookies={cookies} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withCookies(App);
