import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CloseIcon = (props: SvgProps) => (
  <Svg width={20} height={21} fill="none" {...props}>
    <Path
      fill={props.color || '#555A61'}
      fillRule="evenodd"
      d="M15.442 5.058a.625.625 0 0 1 0 .884L10.884 10.5l4.558 4.558a.625.625 0 1 1-.884.884L10 11.384l-4.558 4.558a.625.625 0 1 1-.884-.884L9.116 10.5 4.558 5.942a.625.625 0 1 1 .884-.884L10 9.616l4.559-4.558a.625.625 0 0 1 .883 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CloseIcon;
