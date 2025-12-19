import { EmptyIcon } from '@assets';
import { Text, View } from '@components';
import colors from '@utils/constants/colors';
import React from 'react';

interface IProps {
  title?: string;
}

const EmptyData = ({ title }: IProps) => {
  return (
    <View flex={1} center gap={8}>
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
