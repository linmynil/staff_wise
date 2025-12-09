import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ArrowDown = (props: SvgProps) => (
  <Svg width={16} height={17} fill="none" {...props}>
    <Path
      stroke={props.color || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="m13.28 6.467-4.346 4.346a1.324 1.324 0 0 1-1.867 0L2.721 6.467"
    />
  </Svg>
);
export default ArrowDown;
