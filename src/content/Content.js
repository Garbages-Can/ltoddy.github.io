import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import LazyLoad from 'react-lazyload';
import { StyleRoot } from 'radium';
import { flipInX, rollIn } from '../animation-config';
import Project from './Project';
import Essay from './Essay';

import css from './Content.css';

class Content extends React.Component {
  constructor() {
    super();
    this.content = this.content.bind(this);
    this.project = this.project.bind(this);
  }

  project() {
    return this.props.projects.map((project, index) =>
      <LazyLoad height={200} key={index}>
        <StyleRoot>
          <div style={flipInX}>
            <Project title={project.title}
                     description={project.description}
                     link={project.link}
                     language={project.language}
                     star={project.star}
                     fork={project.fork}
            />
          </div>
        </StyleRoot>
      </LazyLoad>
    );
  }

  content() {
    return this.props.essays.map((essay, index) =>
      <LazyLoad height={150} key={index}>
        <StyleRoot>
          <div style={rollIn}>
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
        <div className={css.content}>
          <Timeline>
            {this.content()}
          </Timeline>
        </div>
        <div className={css.project}>
          {this.project()}
        </div>
      </div>
    );
  }
}

module.exports = Content;
