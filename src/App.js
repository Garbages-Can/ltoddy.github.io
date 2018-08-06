import React from 'react';

import Header from './Header';
import Content from './content/Content';
import Footer from './Footer';
import Corner from './components/Corner';

import css from './App.css';
import { username, essays, header } from '../config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repos: []}
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(repos => this.setState({repos: repos.sort((a, b) => a.stargazers_count < b.stargazers_count)}));
  }

  componentWillUnmount() {
    delete this.state.repos;
  }

  render() {
    return (
      <div className={css.container}>
        <Header
          title={header.title}
          subtitle={header.subtitle}
          content={header.content}
        />
        <Content essays={essays}
                 repos={this.state.repos}
        />
        <Footer/>
        <Corner/>
      </div>
    )
  }
}

module.exports = App;
