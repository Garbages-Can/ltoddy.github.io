import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import LazyLoad from 'react-lazyload';
import { StyleRoot } from 'radium';
import { rotateInDownLeft } from './animation-config';
import Project from './Project';
import Essay from './Essay';

import css from './content/Content.css';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.content.bind(this);
  }

  content() {
    return this.props.essays.map((essay, index) =>
      <LazyLoad height={150} key={index}>
        <StyleRoot>
          <div style={rotateInDownLeft}>
            <Essay title={essay.title}
                   createdAt={essay.createdAt}
                   link={essay.link} preview={essay.preview}
            />
          </div>
        </StyleRoot>
      </LazyLoad>
    );
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
