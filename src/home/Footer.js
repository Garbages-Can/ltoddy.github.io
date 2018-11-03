import React from 'react';
import PropTypes from 'prop-types';

import css from './Footer.css';


const Footer = ({ changeLanguage }) => (
  <div className={css.footer}>
    <div className={css.container}>
      <span>@2018 刘涛</span>
      <span className={css.language} onClick={changeLanguage}>English</span>
      <span className={css.divider}> / </span>
      <span className={css.language} onClick={changeLanguage}>中文</span>
    </div>
  </div>
);

Footer.propTypes = {
  changeLanguage: PropTypes.func.isRequired
};

export default Footer;
