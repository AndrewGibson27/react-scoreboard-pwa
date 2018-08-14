import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import LogInMutation from '../mutations';

const API_URL = 'http://localhost:3000/graphql';

export default class Form extends Component {
  constructor() {
    super();

    this.state = {
      errorMessage: '',
      email: '',
      password: '',
      successful: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange({ target: { value } }) {
    this.setState({ email: value });
  }

  handlePasswordChange({ target: { value } }) {
    this.setState({ password: value });
  }

  doLogin() {
    const { email, password } = this.state;

    axios.post(API_URL, {
      query: LogInMutation,
      variables: { input: { email, password } },
    })
      .then(() => {
        this.setState({ successful: true });
      })
      .catch(({ response: { data: { errors } } }) => {
        let errorMessage = '';

        errors.forEach(({ message }) => {
          errorMessage += ` ${message}`;
        });

        this.setState({ errorMessage });
      });
  }

  render() {
    const {
      email,
      password,
      errorMessage,
      successful,
    } = this.state;

    if (successful) return <Redirect to="/scores" />;

    return (
      <form
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          this.doLogin();
        }}
      >
        <input
          type="email"
          aria-label="enter email"
          placeholder="email"
          value={email}
          onChange={this.handleEmailChange}
        />
        <input
          type="password"
          aria-label="enter password"
          placeholder="password"
          value={password}
          onChange={this.handlePasswordChange}
        />
        <input type="submit" />
        {errorMessage}
      </form>
    );
  }
}
