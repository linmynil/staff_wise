import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const PenEdit = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox={'0 0 20 20'} fill="none" {...props}>
    <Path
      fill={props.color || '#555A61'}
      fillRule="evenodd"
      d="M13.987 2.317a1.875 1.875 0 0 1 2.651 0l1.045 1.045c.732.732.732 1.92 0 2.652l-7.554 7.553a.625.625 0 0 1-.441.183H6.874a.625.625 0 0 1-.625-.625v-2.812c0-.166.066-.325.183-.442l6.562-6.562.992-.992Zm2.812 2.813-.549.549-1.929-1.929.55-.549a.625.625 0 0 1 .883 0L16.8 4.246a.625.625 0 0 1 0 .884Zm-1.433 1.433-1.928-1.929L7.5 10.572V12.5h1.929l5.937-5.937Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color || '#555A61'}
      d="M3.75 2.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V10a.625.625 0 1 0-1.25 0v6.25H3.75V3.75H10a.625.625 0 1 0 0-1.25H3.75Z"
    />
  </Svg>
);
export default PenEdit;
