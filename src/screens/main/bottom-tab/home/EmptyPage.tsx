import { Text, View } from '@components';
import colors from '@utils/constants/colors';

import React from 'react';
import { ActivityIndicator } from 'react-native';

const EmptyPage = () => {
  return (
    <View flex={1} center>
      <ActivityIndicator size="small" color={colors.neutral.c500} />
      <Text size={14} color={colors.neutral.c500} weight={600} marginTop={14}>
        Trang đang được xây dựng...
      </Text>
    </View>
  );
};

export default EmptyPage;
