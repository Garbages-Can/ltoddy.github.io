import React from 'react'
import { Timeline } from 'react-event-timeline'
import LazyLoad from 'react-lazyload'
import { StyleRoot } from 'radium'
import PropTypes from 'prop-types'

import { flipInX, rollIn } from '../animation-config'
import Repository from './Repository'
import Essay from './Essay'
import Pagination from './Pagination'

import css from './Content.css'

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      essayIndexBegin: 0,
      essayIndexEnd: this.props.perPageCount,
    }

    this.content = this.content.bind(this)
    this.repository = this.repository.bind(this)
    this.changeEssayPagination = this.changeEssayPagination.bind(this)
  }

  changeEssayPagination(essayIndexBegin) {
    this.setState(() => ({
      essayIndexBegin: essayIndexBegin,
      essayIndexEnd: essayIndexBegin + this.props.perPageCount,
    }))
  }

  repository() {
    return this.props.repos.map((repo, index) => (
      <LazyLoad height={200} key={index}>
        <StyleRoot>
          <div style={flipInX}>
            <Repository {...repo} />
          </div>
        </StyleRoot>
      </LazyLoad>
    ))
  }

  content() {
    return this.props.essays
      .slice(this.state.essayIndexBegin, this.state.essayIndexEnd)
      .map((essay, index) => (
        <LazyLoad height={150} key={index}>
          <StyleRoot>
            <div style={rollIn}>
              <Essay {...essay} />
            </div>
          </StyleRoot>
        </LazyLoad>
      ))
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.content}>
          <Timeline>{this.content()}</Timeline>
          <Pagination
            perPageCount={this.props.perPageCount}
            pageCount={this.props.essays.length / this.props.perPageCount}
            changeEssayPagination={this.changeEssayPagination}
          />
        </div>

        <div className={css.repository}>{this.repository()}</div>
      </div>
    )
  }
}

Content.propTypes = {
  repos: PropTypes.array,
  essays: PropTypes.array,
  perPageCount: PropTypes.number,
}

export default Content
