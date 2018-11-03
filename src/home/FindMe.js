import React from 'react';
import PropTypes from 'prop-types';

import css from './FindMe.css';


class FindMe extends React.Component {
  constructor(props) {
    super(props);

    this.renderLinks = this.renderLinks.bind(this);
  }

  renderLinks() {
    return this.props.find.map((link, index) => <li key={index}><a href={link[1]}>{link[0]}</a></li>);
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.title}>{this.props.title}</div>
        <ul className={css.links}>
          {this.renderLinks()}
        </ul>
      </div>
    )
  }
}

FindMe.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired))
};

export default FindMe;
