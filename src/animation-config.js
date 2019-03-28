import Radium from 'radium'
import { rubberBand, rollIn, flipInX, slideInDown } from 'react-animations'

export const slideInDownOption = {
  animation: 'x 0.6s',
  animationName: Radium.keyframes(slideInDown, 'slideInDown'),
}

export const rubberBandOption = {
  // github logo
  animation: 'x 2s',
  animationName: Radium.keyframes(rubberBand, 'rubberBand'),
}

export const rollInOption = {
  animation: 'x 1s',
  animationName: Radium.keyframes(rollIn, 'rollIn'),
}

export const flipInXOption = {
  animation: 'x 1s',
  animationName: Radium.keyframes(flipInX, 'flipInX'),
}
