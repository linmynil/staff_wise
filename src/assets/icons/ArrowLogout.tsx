import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ArrowLogout = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Path
      fill="#DC2626"
      d="M3.7 3.133a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-9v18h9v-1.5a.75.75 0 0 1 1.5 0v1.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-18Z"
    />
    <Path
      fill="#DC2626"
      d="M16.669 16.413a.75.75 0 0 1 0-1.06l2.47-2.47H8.949a.75.75 0 0 1 0-1.5h10.19l-2.47-2.47a.75.75 0 0 1 1.06-1.06l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0Z"
    />
  </Svg>
);
export default ArrowLogout;
