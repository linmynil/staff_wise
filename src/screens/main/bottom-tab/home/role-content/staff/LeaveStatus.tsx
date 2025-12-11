import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MainLayout from '@components/layout/main-layout';
import { Button, Text, TextInput, View } from '@components';
import { AddIcon } from '@assets';
import { useNavigation } from '@react-navigation/native';
import { StaffRoutes } from '@navigation/routes';
import MultipleSelect, {
  MultipleSelectOption,
} from '@components/common/multiple-select';
import { useBottomSheetContext2 } from '@components/common/bottom-sheet-outside';
import { height } from '@utils/helpers/dimension';
import SelectBox from '@components/common/select-box';
import colors from '@utils/constants/colors';
import DatePicker from '@components/common/date-picker';
import dayjs from 'dayjs';

const options = [
  {
    value: '1',
    label: 'ABCX',
  },
  {
    value: '2',
    label: 'dsfs',
  },
  {
    value: '13',
    label: 'ABCX',
  },
  {
    value: '23453',
    label: 'dsfs',
  },
  {
    value: '13452345',
    label: 'ABCX',
  },
  {
    value: '223424',
    label: 'dsfs end',
  },
];

const data: MultipleSelectOption[] = [
  {
    value: '1',
    label: 'B1',
  },
  {
    value: '2',
    label: 'B2',
  },
  {
    value: '3',
    label: 'B3',
  },
  {
    value: '4',
    label: 'B4',
  },
  {
    value: '5',
    label: 'B5',
  },
  {
    value: '6',
    label: 'B6',
  },
  {
    value: '7',
    label: 'B7',
  },
  {
    value: '8',
    label: 'B8',
  },
  {
    value: '9',
    label: 'B9',
  },
  {
    value: '10',
    label: 'B10',
  },
  {
    value: '11',
    label: 'B11',
  },
  {
    value: '12',
    label: 'B12',
  },
  {
    value: '13',
    label: 'B13',
  },
  {
    value: '14',
    label: 'B14',
  },
  {
    value: '15',
    label: 'B15',
  },
  {
    value: '16',
    label: 'B16',
  },
  {
    value: '17',
    label: 'B17',
  },
  {
    value: '18',
    label: 'B18',
  },
  {
    value: '19',
    label: 'B19',
  },
  {
    value: '20',
    label: 'B20',
  },
  {
    value: '21',
    label: 'B21',
  },
];

const LeaveStatus = () => {
  const navigation = useNavigation<any>();
  const onAdditionalLeave = () => {
    navigation.navigate(StaffRoutes.STAFF_ADDITIONAL_LEAVE);
  };

  const [test, setTest] = useState('1');
  const [pickedDisease, setPickedDisease] = useState(
    [] as MultipleSelectOption[],
  );
  const [time, setTime] = useState(new Date());

  const { openBottomSheet2, closeBottomSheet2 } = useBottomSheetContext2();

  const handleOpenBottomSheet = () => {
    openBottomSheet2({
      snapPoints: [height * 0.5, height * 0.75],
      // fixSnapPoints: true,
      content: (
        <View
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: 16,
          }}
        >
          <TextInput label="12121" />

          <View row center space_between gap={8}>
            <View flex={1}>
              <Button title="Huỷ" onPress={closeBottomSheet2} />
            </View>

            <View flex={1}>
              <Button
                title="OK"
                onPress={() => {
                  console.log('ok');
                }}
              />
            </View>
          </View>
        </View>
      ),
    });
  };
  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Leave Status"
      next={
        <Button.IconButton
          icon={<AddIcon width={25} height={25} viewBox="0 0 30 30" />}
          onPress={onAdditionalLeave}
        />
      }
    >
      <View style={styles.container}>
        <Text>Leave Status</Text>
        <Button title="Bottom sheet 2" onPress={handleOpenBottomSheet} />
        <SelectBox
          label="Loại xe"
          placeholder="Chọn loại xe"
          searchLabel="Tìm kiếm loại xe"
          searchPlaceholder="Nhập loại xe tìm kiếm"
          options={options}
          value={test}
          onChange={v => setTest(v)}
        />
        <DatePicker
          placeholder="Chọn ngày đăng ký"
          label="Ngày đăng ký"
          max={dayjs()}
          value={time as any}
          onChange={date => setTime(date as any)}
        />
        <MultipleSelect
          value={pickedDisease}
          label={'Danh sách bệnh'}
          style={styles.button}
          labelStyle={styles.title}
          searchLabel={'Tìm kiếm bệnh'}
          searchPlaceholder={'Nhập tên bệnh'}
          options={data}
          onChange={value => {
            setPickedDisease(value);
          }}
        />
        {!!pickedDisease?.length && (
          <Text size={13} color={colors.orange.c500} weight={600}>
            Đã chọn "
            <Text size={13} color={colors.orange.c500} weight={600}>
              {pickedDisease.map(v => v.label).join(', ')}
            </Text>
            "
          </Text>
        )}
      </View>
    </MainLayout>
  );
};

export default LeaveStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    alignSelf: 'flex-start',
    height: 42,
    paddingHorizontal: 16,
    backgroundColor: colors.primary.c500,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
