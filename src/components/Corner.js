import React from 'react';
import BackTop from './BackTop';
import Old from './Old';
import css from './Corner.css';

class Corner extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={css.position}>
        <div className={css.container}>
          <Old/>
          <BackTop/>
        </div>
      </div>
    )
  }
}

module.exports = Corner;
