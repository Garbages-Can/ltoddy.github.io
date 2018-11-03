import React from 'react';
import PropTypes from 'prop-types';


class Faith extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Faith</div>
    )
  }
}

Faith.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default Faith;
