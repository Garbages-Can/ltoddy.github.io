import React from 'react';
import ReactTooltip from 'react-tooltip'
import LazyLoad from 'react-lazyload';
import { StyleRoot } from 'radium';

import qq from '../assets/qq.jpg';
import { rubberBand } from './animation-config';
import css from './Footer.css';


const Footer = () => (
  <div className={css.footer}>
    <div className={css.container}>
      <div>本页面由React框架构建</div>

      <div className={css.logo}>
        <LazyLoad height={200}>
          <StyleRoot>
            <div style={rubberBand}>
              <a href='https://github.com/ltoddy/ltoddy.github.io' target='_blank' data-tip data-for='src'>
                <i className='fab fa-github'/>
              </a>
            </div>
            <ReactTooltip id='src'>源代码</ReactTooltip>
          </StyleRoot>
        </LazyLoad>
      </div>

      <div className={css.contact}>
        <div data-tip data-for='qq'>QQ: 1205446803</div>
        <div>e-mail: taoliu14@acm.org</div>
        <ReactTooltip id='qq'>
          <img className={css.qq} src={qq} alt=""/>
        </ReactTooltip>
      </div>
    </div>
  </div>
);

export default Footer;
