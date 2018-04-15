import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import ReactTooltip from 'react-tooltip'
import css from './Content.css';

const Essay = (props) => (
  <TimelineEvent title={props.title}
                 createdAt={props.createdAt}
                 icon={<i className="material-icons md-18"/>}
  >
    <div className={css.preview}>
      <a href={props.link} target="_blank" data-tip data-for={props.title}>{props.previews}</a>
    </div>
    <ReactTooltip id={props.title}>Go to {props.link.split('/').slice(-1)}</ReactTooltip>
  </TimelineEvent>
);

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.content.bind(this);
  }

  content() {
    return this.props.essays.map((essay, index) =>
      <Essay key={index}
             title={essay.title}
             createdAt={essay.createdAt}
             link={essay.link} previews={essay.previews}
      />);
  };

  render() {
    return (
      <div className={css.container}>
        <Timeline>
          {this.content()}
        </Timeline>
      </div>
    );
  }
}

module.exports = Content;
