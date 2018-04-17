import Radium from 'radium';
import { slideInDown, rubberBand, rotateInDownLeft, bounceInRight } from 'react-animations';

module.exports = {
  slideInDown: { // me logo
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInDown, 'slideInDown')
  },
  rubberBand: { // github logo
    animation: 'x 2s',
    animationName: Radium.keyframes(rubberBand, 'rubberBand')
  },
  rotateInDownLeft: { // content -> essay preview card
    animation: 'x 1s',
    animationName: Radium.keyframes(rotateInDownLeft, 'rotateInDownLeft')
  },
  bounceInRight: { // content -> project card
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInRight, 'bounceInRight')
  }
};
