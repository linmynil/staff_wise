import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ChatIcon = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props} viewBox="0 0 20 20">
    <Path
      fill={props?.fill || '#555a61'}
      fillRule="evenodd"
      d="M10 19.137c5.523 0 10-4.284 10-9.568C20 4.284 15.523 0 10 0S0 4.284 0 9.569c0 1.423.367 2.919 1.1 4.487l.163.338a4.154 4.154 0 0 1 .08 3.533c-.464 1.049-.543 1.7-.237 1.955.336.28 1.301.062 2.897-.652l.43-.198a4.173 4.173 0 0 1 2.64-.305l.22.053c.882.238 1.784.357 2.707.357Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ChatIcon;
