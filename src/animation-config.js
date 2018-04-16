import Radium from 'radium';
import { fadeIn, slideInDown, rubberBand, rotateInDownLeft } from 'react-animations';

module.exports = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  slideInDown: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInDown, 'slideInDown')
  },
  rubberBand: {
    animation: 'x 3s',
    animationName: Radium.keyframes(rubberBand, 'rubberBand')
  },
  rotateInDownLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(rotateInDownLeft, 'rotateInDownLeft')
  }
};
