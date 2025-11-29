import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ChevronRight = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill="#333"
      fillRule="evenodd"
      d="M7.257 16.2a.625.625 0 0 1 0-.884l5.183-5.183L7.257 4.95a.625.625 0 1 1 .884-.884l5.625 5.625a.625.625 0 0 1 0 .884L8.141 16.2a.625.625 0 0 1-.884 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ChevronRight;
