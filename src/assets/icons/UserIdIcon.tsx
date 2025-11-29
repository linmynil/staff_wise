import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const UserIdIcon = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Path
      fill={props.color || '#333'}
      fillRule="evenodd"
      d="M12.2 9.133a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color || '#333'}
      d="M12.2 17.383a3 3 0 0 1 6 0 .75.75 0 0 0 1.5 0 4.5 4.5 0 1 0-9 0 .75.75 0 0 0 1.5 0ZM4.7 8.383a.75.75 0 0 1 .75-.75H9.2a.75.75 0 0 1 0 1.5H5.45a.75.75 0 0 1-.75-.75ZM5.45 11.383a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z"
    />
    <Path
      fill={props.color || '#333'}
      fillRule="evenodd"
      d="M1.7 4.633a1.5 1.5 0 0 1 1.5-1.5h18a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-18a1.5 1.5 0 0 1-1.5-1.5v-15Zm19.5 0h-18v15h18v-15Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default UserIdIcon;
