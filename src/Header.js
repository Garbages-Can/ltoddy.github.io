import React from 'react';
import css from './Header.css';
import ReactTooltip from 'react-tooltip'
import { StyleRoot } from 'radium';
import me from '../assets/me.jpg'

import { slideInDown } from './animation-config';

const Header = (props) => (
  <div className={css.container}>
    <div className={css.title}>
      <div>The computer science actually has a lot in common with magic.</div>
    </div>
    <div className={css.introduce}>
      <StyleRoot>
        <div style={slideInDown}>
          <a href="https://github.com/ltoddy" target="_blank" data-tip data-for='github'>
            <img src={me} alt="" className={css.logo}/>
          </a>
          <ReactTooltip id='github'>Go to Github</ReactTooltip>
        </div>
      </StyleRoot>
      <div className={css.content}>
        <div>我是一名web工程师,目前正在为暑假寻找一份Python或node工作(南京).</div>
        <ul>
          <li>自己已经完全使用Linux(Ubuntu)工作快两年了,熟练的使用命令行.</li>
          <li>目前已经使用docker进行容器化开发.</li>
          <li>熟悉的框架:Django, Flask, Sanic.</li>
          <li>熟悉MySQL, mongodb, redis三大数据库.</li>
          <li>喜欢开源(Github),喜欢折腾.</li>
          <li>由SICP这本书认识Scheme,并觉得Scheme是世界上最好的语言:(</li>
        </ul>
      </div>
    </div>
  </div>
);

module.exports = Header;