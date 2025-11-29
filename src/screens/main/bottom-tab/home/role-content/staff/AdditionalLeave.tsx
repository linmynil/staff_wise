import MainLayout from '@components/layout/main-layout';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AdditionalLeave = () => {
  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Additional Leave"
    >
      <View style={styles.container}>
        <Text>AdditionalLeave</Text>
      </View>
    </MainLayout>
  );
};

export default AdditionalLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
