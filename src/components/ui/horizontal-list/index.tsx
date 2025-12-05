import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { AnnualIcon, HolidaysIcon } from '@assets';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HORIZONTAL_PADDING = 16 * 2;
const GAP = 12;

const ITEM_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING - GAP * 2) / 3;

export interface IProps {
  id: string;
  typeDate: string;
  date: string | number;
  totalDate: string | number;
}

interface Props {
  data: IProps[];
}

const HorizontalList = ({ data }: Props) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Annual':
        return <AnnualIcon width={17} height={19} viewBox="0 0 17 19" />;
      case 'Holidays':
        return <HolidaysIcon width={22} height={22} viewBox="0 0 22 22" />;
      default:
        return null;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'Annual':
        return 'Annual';
      case 'Holidays':
        return 'Holidays';
      default:
        return type;
    }
  };
const pad = (n: string | number) => {
  const num = Number(n);
  return num < 10 ? `0${num}` : `${num}`;
};


  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={3}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 4,
      }}
      columnWrapperStyle={{
        justifyContent: data.length >= 3 ? 'space-between' : 'flex-start',
        columnGap: 12,
        marginBottom: 12,
      }}
      renderItem={({ item }) => (
        <View style={[styles.card, { width: ITEM_WIDTH }]}>

          {getIcon(item.typeDate)}
          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end',alignItems: 'center'}}>
            <Text size={30} weight={600} color={colors.neutral.c900}>
              {pad(item.date)}
            </Text>
            <Text size={14} color={colors.neutral.c500}>
             /{pad(item.totalDate)}
            </Text>
          </View>

          <Text size={14} color={colors.neutral.c500} >
            {getLabel(item.typeDate)}
          </Text>
        </View>
      )}
    />
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'flex-start',

    shadowColor: colors.blue.c500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 2,
  },
});
