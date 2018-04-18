import React from 'react';
import ReactTooltip from 'react-tooltip'

import css from './BackTop.css';

class BackTop extends React.Component {
  constructor() {
    super();
    this.toTop = this.toTop.bind(this);
  }

  toTop(event) {
    event.preventDefault();
    const id = setInterval(() => {
      const top = document.documentElement.scrollTop; // 到达顶部的距离
      const speed = top / 15 + 3;
      if (top > 1) {
        document.documentElement.scrollTop -= speed;
      }

      if (top < 3) {
        window.clearInterval(id);
      }
    }, 20);
  }

  render() {
    return (
      <div className={css.position} onClick={this.toTop} data-tip data-for='top'>
        <div className={css.container}>
          <i className="fas fa-arrow-up"/>
        </div>
        <ReactTooltip id='top'>back to top</ReactTooltip>
      </div>
    );
  }
}

module.exports = BackTop;
