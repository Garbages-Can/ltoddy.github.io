import React from 'react'
import PropTypes from 'prop-types'

import css from './Pagination.css'

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.renderPagination = this.renderPagination.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = { changeEssayPagination: this.props.changeEssayPagination }
  }

  handleClick(event) {
    event.preventDefault()
    this.state.changeEssayPagination(
      parseInt(event.target.innerHTML) * this.props.perPageCount
    )
  }

  renderPagination() {
    const list = []
    for (let i = 0; i < this.props.pageCount; i++) {
      list.push(i)
    }

    return list.map((value, index) => (
      <li key={index} onClick={this.handleClick}>
        {value}
      </li>
    ))
  }

  render() {
    return (
      <div className={css.container}>
        <ul className={css.pagination}>{this.renderPagination()}</ul>
      </div>
    )
  }
}

Pagination.propTypes = {
  perPageCount: PropTypes.number,
  pageCount: PropTypes.number,
  changeEssayPagination: PropTypes.func,
}

export default Pagination
