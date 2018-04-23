import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import css from './Project.css';

const languageColor = {
  Python: '#3572A5',
  Scheme: '#1e4aec',
  HTML: '#e34c26',
  Shell: '#89e051',
  JavaScript: '#f1e05a'
};

class Project extends React.Component {
  constructor() {
    super();
    this.stars = this.stars.bind(this);
    this.forks = this.forks.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  stars() {
    return this.props.star === 0 ? <div/> : (
      <span className={css.star}>
        <i className="fas fa-star"/>
        <span>&nbsp;{this.props.star}</span>
      </span>
    );
  }

  forks() {
    return this.props.fork === 0 ? <div/> : (
      <span className={css.fork}>
        <i className="fas fa-code-branch"/>
        <span>&nbsp;{this.props.fork}</span>
      </span>
    );
  }


  render() {
    return (
      <a href={this.props.link} target="_blank" data-tip data-for={this.props.title}>
        <div className={css.container}>
          <div className={css.title}>{this.props.title}</div>

          <div className={css.description}>{this.props.description}</div>

          <div className={css.repo}>
            <span className={css.language}>
              <i className="fas fa-circle" style={{ "color": `${languageColor[this.props.language]}` }}/>
              <span>&nbsp;{this.props.language}</span>
            </span>

            {this.stars()}

            {this.forks()}
          </div>
        </div>
        <ReactTooltip id={this.props.title}>Go to {this.props.link.split('/').slice(-1)}</ReactTooltip>
      </a>
    )
  }
}

Project.propTypes = {
  star: PropTypes.number,
  fork: PropTypes.number,
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string
};

module.exports = Project;
