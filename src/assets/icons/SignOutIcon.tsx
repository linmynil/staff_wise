import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SignOutIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill={props?.fill || '#555a61'}
    viewBox="0 0 256 256"
    {...props}
  >
    <Path d="M120 216a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h64a8 8 0 0 1 0 16H56v160h56a8 8 0 0 1 8 8Zm109.66-93.66-40-40a8 8 0 0 0-11.32 11.32L204.69 120H112a8 8 0 0 0 0 16h92.69l-26.35 26.34a8 8 0 0 0 11.32 11.32l40-40a8 8 0 0 0 0-11.32Z" />
  </Svg>
);
export default SignOutIcon;
