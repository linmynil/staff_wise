import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const DocumentTextIcon = (props: SvgProps) => (
  <Svg width={16} height={17} fill="none" {...props}>
    <Path
      fill={props.color || '#CA7C14'}
      d="M5 4.373a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5ZM5 6.873a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5ZM5.5 8.873a.5.5 0 1 0 0 1h5a.5.5 0 0 0 0-1h-5ZM5 11.873a.5.5 0 0 1 .5-.5H8a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5Z"
    />
    <Path
      fill={props.color || '#CA7C14'}
      fillRule="evenodd"
      d="M4 1.373a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1H4Zm0 1h8v12H4v-12Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default DocumentTextIcon;
