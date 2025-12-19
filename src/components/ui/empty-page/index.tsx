import { Text, View } from '@components';
import colors from '@utils/constants/colors';

import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const EmptyPage = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.neutral.c500} />
      <Text size={14} color={colors.neutral.c500} weight={600} marginTop={14}>
        The page is under construction...
      </Text>
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
