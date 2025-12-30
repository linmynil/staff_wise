import { EmptyIcon } from '@assets';
import { Text, View } from '@components';
import colors from '@utils/constants/colors';
import { height } from '@utils/helpers/dimension';
import React from 'react';

interface IProps {
  title?: string;
  marginTop?: number;
}

const EmptyData = ({ title, marginTop }: IProps) => {
  return (
    <View flex={1} center gap={8} marginTop={marginTop ?? height * 0.3}>
      <View>
        <EmptyIcon width={50} height={50} />
      </View>
      <Text size={14} color={colors.neutral.c200} weight={600}>
        {title || 'No data'}
      </Text>
    </View>
  );
};

export default EmptyData;
