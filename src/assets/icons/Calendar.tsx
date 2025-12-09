import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Calendar = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#555A61"
      fillRule="evenodd"
      d="M12.499 2.5h-5v-.625a.625.625 0 1 0-1.25 0V2.5h-2.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V3.75c0-.69-.56-1.25-1.25-1.25h-2.5v-.625a.625.625 0 1 0-1.25 0V2.5ZM6.874 5a.625.625 0 0 1-.625-.625V3.75h-2.5v2.5h12.5v-2.5h-2.5v.625a.625.625 0 1 1-1.25 0V3.75h-5v.625c0 .345-.28.625-.625.625ZM3.749 7.5h12.5v8.75h-12.5V7.5Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Calendar;
