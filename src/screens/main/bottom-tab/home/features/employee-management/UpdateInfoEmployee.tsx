import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainLayout from '@components/layout/main-layout';

const UpdateInfoEmployee = () => {
  return (
    <MainLayout back={<MainLayout.BackToPreviousButton />} title="Update Info Employee">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text>Update Employee</Text>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default UpdateInfoEmployee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
