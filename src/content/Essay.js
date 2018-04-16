import React from 'react';
import { TimelineEvent } from 'react-event-timeline';
import css from './Essay.css';

const Essay = (props) => (
  <TimelineEvent title={props.title}
                 createdAt={props.createdAt}
                 icon={<i className="material-icons md-18"/>}
  >
    <div className={css.preview}>
      <a href={props.link}>{props.preview}</a>
    </div>
  </TimelineEvent>
);

module.exports = Essay;
