import React from 'react'
import ReactTooltip from 'react-tooltip'
import { StyleRoot } from 'radium'
import PropTypes from 'prop-types'

import { slideInDownOption } from '../animation-config'

import me from '../../assets/me.jpg'
import css from './Banner.css'

class Banner extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.title}>
          <div>{this.props.title}</div>
        </div>
        <div className={css.introduce}>
          <StyleRoot>
            <div style={slideInDownOption}>
              <a
                href="https://github.com/ltoddy"
                target="_blank"
                data-tip
                data-for="github"
              >
                <img src={me} alt="me logo" className={css.logo} />
              </a>
              <ReactTooltip id="github">Go to Github</ReactTooltip>
            </div>
          </StyleRoot>
          <div className={css.content}>
            <h2>{this.props.subtitle}</h2>
            <ul>
              {this.props.content.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
}

export default Banner
