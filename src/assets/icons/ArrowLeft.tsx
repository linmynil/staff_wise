import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ArrowLeft = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      d="M11.03 5.78a.75.75 0 1 0-1.06-1.06l-6.75 6.75a.75.75 0 0 0 0 1.06l6.75 6.75a.75.75 0 1 0 1.06-1.06l-5.47-5.47h14.69a.75.75 0 0 0 0-1.5H5.56l5.47-5.47Z"
    />
  </Svg>
);
export default ArrowLeft;
