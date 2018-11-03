import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import css from './Repository.css';


const languageColor = {
  Python: '#3572A5',
  Scheme: '#1e4aec',
  HTML: '#e34c26',
  Shell: '#89e051',
  JavaScript: '#f1e05a',
  C: '#555555',
  'C++': '#f34b7d',
  Racket: '#22228f',
  Rust: '#dea584',
  Haskell: '#5e5086'
};

class Repository extends React.Component {
  constructor() {
    super();
    this.stars = this.stars.bind(this);
    this.forks = this.forks.bind(this);
  }

  stars() {
    return this.props.stargazers_count === 0 ? <div/> : (
      <span className={css.star}>
        <i className="fas fa-star"/>
        <span>&nbsp;{this.props.stargazers_count}</span>
      </span>
    );
  }

  forks() {
    return this.props.forks === 0 ? <div/> : (
      <span className={css.forks}>
        <i className="fas fa-code-branch"/>
        <span>&nbsp;{this.props.forks}</span>
      </span>
    );
  }

  render() {
    return (
      <a href={this.props.html_url} target="_blank" data-tip data-for={this.props.full_name}>
        <div className={css.container}>
          <div className={css.full_name}>{this.props.full_name}</div>

          <div className={css.description}>{this.props.description}</div>

          <div className={css.repo}>
            <span className={css.language}>
              <i className="fas fa-circle" style={{ 'color': `${languageColor[this.props.language]}` }}/>
              <span>&nbsp;{this.props.language}</span>
            </span>

            {this.stars()}

            {this.forks()}
          </div>
        </div>
        <ReactTooltip id={this.props.full_name}>Go to {this.props.html_url.split('/').slice(-1)}</ReactTooltip>
      </a>
    )
  }
}

Repository.propTypes = {
  stargazers_count: PropTypes.number,
  forks: PropTypes.number,
  html_url: PropTypes.string,
  full_name: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string
};

export default Repository;
