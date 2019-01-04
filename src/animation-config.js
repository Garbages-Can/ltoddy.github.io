import Radium from 'radium'
import { rubberBand, rollIn, flipInX, slideInDown } from 'react-animations'

module.exports = {
  slideInDown: {
    animation: 'x 0.6s',
    animationName: Radium.keyframes(slideInDown, 'slideInDown'),
  },
  rubberBand: {
    // github logo
    animation: 'x 2s',
    animationName: Radium.keyframes(rubberBand, 'rubberBand'),
  },
  rollIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(rollIn, 'rollIn'),
  },
  flipInX: {
    animation: 'x 1s',
    animationName: Radium.keyframes(flipInX, 'flipInX'),
  },
}
