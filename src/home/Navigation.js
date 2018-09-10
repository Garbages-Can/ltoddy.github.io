import React from 'react';
import PropTypes from 'prop-types';

import css from './Navigation.css';


class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.renderLinks = this.renderLinks.bind(this);
  }

  renderLinks() {
    return this.props.links.map((link, index) =>
      index === this.props.links.length - 1 ? (
        <span className={css.breadcrumbItem} key={index}>
            <a href={link[1]} target={'_blank'}>{link[0]}</a>
          </span>
      ) : (
        <span className={css.breadcrumbItem} key={index}>
          <a href={link[1]} target={'_blank'}>{link[0]}</a>
          <span className={css.breadcrumbDivider}> / </span>
        </span>
      ));
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.breadcrumb}>
          {this.renderLinks()}
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  links: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired))
};

export default Navigation;
