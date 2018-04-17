import React from 'react';
import css from './Footer.css';
import ReactTooltip from 'react-tooltip'
import LazyLoad from 'react-lazyload';
import { StyleRoot } from 'radium';

import { rubberBand } from './animation-config';

const Footer = () => (
  <div className={css.footer}>
    <div className={css.container}>
      <div>本页面由React框架构建</div>

      <div className={css.logo}>
        <LazyLoad height={200}>
          <StyleRoot>
            <div style={rubberBand}>
              <a href='https://github.com/ltoddy/resume' target='_blank' data-tip data-for='src'>
                <i className='fab fa-github'/>
              </a>
            </div>
            <ReactTooltip id='src'>源代码</ReactTooltip>
          </StyleRoot>
        </LazyLoad>
      </div>

      <div className={css.contact}>
        <div>QQ: 1205446803</div>
        <div>e-mail: taoliu14@acm.org</div>
      </div>
    </div>
  </div>
);

module.exports = Footer;
