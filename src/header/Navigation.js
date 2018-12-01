import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'

import css from './Navigation.css';

// sub component
const Channel = (props) => (
  <div className={css.channel} data-tip data-for={props.title}>
    <a href={props.link}>{props.title}</a>
    <ReactTooltip id={props.title}>前往{props.title}</ReactTooltip>
  </div>
);

Channel.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.renderChannels = this.renderChannels.bind(this);
  }

  renderChannels() {
    return this.props.channels.map((channel, index) =>
      (<Channel key={index} link={channel.link} title={channel.title}/>)
    )
  }

  render() {
    return (
      <nav className={css.container} role={'navigator'}>
        <div className={css.channels}>
          {this.renderChannels()}
        </div>
      </nav>
    )
  }
}

Navigation.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
};

export default Navigation;
