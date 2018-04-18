import React from 'react';
import ReactTooltip from 'react-tooltip'
import { TimelineEvent } from 'react-event-timeline';
import css from './Essay.css';

const Essay = (props) => (
  <TimelineEvent title={props.title}
                 createdAt={props.createdAt}
                 icon={<i className="fas fa-book" style={{ "fontSize": "16px" }} />}
  >
    <div className={css.preview}>
      <a href={props.link} target="_blank" data-tip data-for={props.title}>{props.preview}</a>
    </div>
    <ReactTooltip id={props.title}>Go to {props.link.split('/').slice(-1)}</ReactTooltip>
  </TimelineEvent>
);

module.exports = Essay;
