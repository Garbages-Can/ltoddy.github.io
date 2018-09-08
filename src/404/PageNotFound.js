import React from 'react';
import { Link } from 'react-router-dom';

import css from './PageNotFound.css';


class PageNotFound extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.gradual}>
          <div className={css.content}>Page not found</div>
        </div>

        <div className={css.backToHome}>
          <Link to={'/'} className={css.back}>Return to home Page</Link>
        </div>
      </div>
    )
  }
}

export default PageNotFound;
