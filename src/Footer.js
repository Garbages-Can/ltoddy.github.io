import React from 'react';
import css from './Footer.css';
import ReactTooltip from 'react-tooltip'

const Footer = () => (
  <div className={css.container}>
    <div>本页面由React框架构建</div>

    <div className={css.logo}>
      <a href="https://github.com/ltoddy/resume" target="_blank" data-tip data-for='src'>
        <i className="fab fa-github"/>
      </a>
    </div>
    <ReactTooltip id='src'>源代码</ReactTooltip>

    <div>本页面由React框架构建</div>
  </div>
);

module.exports = Footer;
