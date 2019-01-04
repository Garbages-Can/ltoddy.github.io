import React from 'react'
import PropTypes from 'prop-types'

// import Navigation from './Navigation';
import Banner from './Banner'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // const {navigation, banner} = this.props;
    const { banner } = this.props

    return (
      <React.Fragment>
        {/*TODO*/}
        {/*<Navigation channels={navigation.channels}/>*/}
        <Banner
          title={banner.title}
          subtitle={banner.subtitle}
          content={banner.content}
        />
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  navigation: PropTypes.shape({
    channels: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,

  banner: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
  }).isRequired,
}

export default Header
