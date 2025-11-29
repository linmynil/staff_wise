import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const InfoCircleIcon = (props: SvgProps) => (
  <Svg width={20} height={21} fill="none" {...props}>
    <Path
      fill={props.color || '#2462B5'}
      d="M8.75 8.625a.625.625 0 1 0 0 1.25h.625v4.375h-1.25a.625.625 0 1 0 0 1.25h3.75a.625.625 0 1 0 0-1.25h-1.25v-5A.625.625 0 0 0 10 8.625H8.75ZM10.938 6.438a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.874 0Z"
    />
    <Path
      fill={props.color || '#2462B5'}
      fillRule="evenodd"
      d="M10 1.75a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5ZM2.5 10.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default InfoCircleIcon;
