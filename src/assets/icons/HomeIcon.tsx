import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const HomeIcon = (props: SvgProps) => (
  <Svg width={30} height={27.5} fill="none" {...props} viewBox="0 0 26 24">
    <Path
      fill={props?.fill || '#555a61'}
      d="m13 5.69 5.417 4.5V18H16.25v-6h-6.5v6H7.583v-7.81L13 5.69ZM13 3 2.167 12h3.25v8h6.5v-6h2.166v6h6.5v-8h3.25"
    />
  </Svg>
);
export default HomeIcon;
