import React from 'react'

import Header from './header/Header'
import Content from './content/Content'
import Footer from './Footer'
import Corner from './components/Corner'

import css from './App.css'
import { username, essays, header, perPageCount } from './config'

class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = { repos: [] }
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(repos =>
        this.setState(() => ({
          repos: repos.sort((a, b) => b.stargazers_count - a.stargazers_count),
        }))
      )
  }

  componentWillUnmount() {
    delete this.state.repos
  }

  render() {
    return (
      <div className={css.container}>
        <Header navigation={header.navigation} banner={header.banner} />
        <Content
          essays={essays}
          repos={this.state.repos}
          perPageCount={perPageCount}
        />
        <Footer />
        <Corner />
      </div>
    )
  }
}

export default Application
