import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const OclockIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill={props?.fill || '#555a61'} viewBox="0 0 256 256" {...props}>
    <Path d="M128 40a96 96 0 1 0 96 96 96.11 96.11 0 0 0-96-96Zm0 176a80 80 0 1 1 80-80 80.09 80.09 0 0 1-80 80ZM61.66 37.66l-32 32a8 8 0 0 1-11.32-11.32l32-32a8 8 0 0 1 11.32 11.32Zm176 32a8 8 0 0 1-11.32 0l-32-32a8 8 0 0 1 11.32-11.32l32 32a8 8 0 0 1 0 11.32ZM184 128a8 8 0 0 1 0 16h-56a8 8 0 0 1-8-8V80a8 8 0 0 1 16 0v48Z" />
  </Svg>
);
export default OclockIcon;
