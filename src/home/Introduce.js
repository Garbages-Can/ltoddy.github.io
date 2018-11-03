import React from 'react';
import PropTypes from 'prop-types';

import css from './Introduce.css';


const Introduce = ({ message }) => (
  <div className={css.container}>
    {message}
  </div>
);

Introduce.propTypes = {
  message: PropTypes.string.isRequired
};

export default Introduce;
