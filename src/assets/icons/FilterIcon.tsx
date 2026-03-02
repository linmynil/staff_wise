import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const FilterIcon = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill={props?.fill || '#333'}
      d="M16.295 14.121a.625.625 0 1 0 1.25 0v-2.5h2.5a.625.625 0 1 0 0-1.25h-2.5v-2.5a.625.625 0 1 0-1.25 0v2.5h-2.5a.625.625 0 1 0 0 1.25h2.5v2.5Z"
    />
    <Path
      fill={props?.fill || '#333'}
      fillRule="evenodd"
      d="M3.17 4.121c0-.69.56-1.25 1.25-1.25h12.5c.69 0 1.25.56 1.25 1.25v1.25a.625.625 0 1 1-1.25 0v-1.25H4.42v2.241l4.634 4.634c.234.234.366.553.366.884v4.741h2.5v-3.125a.625.625 0 1 1 1.25 0v3.125c0 .69-.56 1.25-1.25 1.25h-2.5c-.69 0-1.25-.56-1.25-1.25V11.88L3.536 7.246a1.25 1.25 0 0 1-.366-.884v-2.24Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default FilterIcon;
