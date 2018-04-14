import React from 'react';
import css from './Footer.css';

const Footer = () => (
  <div className={css.container}>
    <a href="https://github.com/ltoddy/resume" target="_blank" className={css.logo}>
      <i className="fab fa-github"/>
    </a>
  </div>
);

module.exports = Footer;
