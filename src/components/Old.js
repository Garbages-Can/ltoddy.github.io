import React from 'react';
import ReactTooltip from 'react-tooltip'
import old from '../../assets/old.png';
import css from './Old.css';


class Old extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <div className={css.container} data-tip data-for='old'>
          <a href="./old" target="_blank">
            <i className="fas fa-info"/>
          </a>
        </div>
        <ReactTooltip id="old">
          <div className={css.old}>
            <img src={old} alt=""/>
          </div>
        </ReactTooltip>
      </div>
    )
  }
}

module.exports = Old;
