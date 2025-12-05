import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Text from '@components/core/text';
import colors from '@utils/constants/colors';
import { AnnualIcon } from '@assets';
import View from '@components/core/view';

export interface IProps {
  id: string;
  title: string;
  time: string;             
  onPress?: () => void;
}

interface Props {
  data: IProps[];
}

const HorizontalSelectList = ({ data }: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}

      horizontal
      showsHorizontalScrollIndicator={false}

      style={{ flexGrow: 0 }}                
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 4,
        columnGap: 12,
        flexGrow: 0,                          
      }}

      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={item.onPress}
          style={styles.card}
        >
          <Text
            size={16}
            weight={600}
            color={colors.white}
            style={{ marginBottom: 4 }}
          >
            {item.title}
          </Text>

          <View style={styles.row}>
            <AnnualIcon
              color={colors.white}
              width={12}
              height={14}
              viewBox="0 0 17 19"
            />
            <Text size={12} color={colors.white}>
              {item.time}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default HorizontalSelectList;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.primary.default,
    minWidth: 110,
    justifyContent: 'center',

    shadowColor: colors.blue.c500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
});
