import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const AudioStopIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill={props?.fill || '#555a61'} viewBox="0 0 256 256" {...props}>
    <Path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm32-128H96a8 8 0 0 0-8 8v64a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V96a8 8 0 0 0-8-8Zm-8 64h-48v-48h48Z" />
  </Svg>
);
export default AudioStopIcon;
