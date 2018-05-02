import React from 'react';

import Header from './Header';
import Content from './content/Content';
import Footer from './Footer';
import Corner from './components/Corner';
import essays from '../essays';

import css from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { repos: [] }
  }

  componentWillMount() {
    fetch('https://api.github.com/users/ltoddy/repos')
      .then(response => response.json())
      .then(repos => this.setState({ repos: repos.sort((a, b) => a.stargazers_count < b.stargazers_count) }));
  }

  componentWillUnmount() {
    delete this.state.repos;
  }

  render() {
    return (
      <div className={css.container}>
        <Header/>
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
