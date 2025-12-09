import { ArrowDown, SearchIcon } from '@assets';
import View from '@components/core/view';
import { removeAccents } from '@utils/constants/string';
import { keyBy, uniqBy } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import colors from '../../../utils/constants/colors';
import Text from '../../core/text';
import { useBottomSheetContext3 } from '../bottom-sheet-for-multiple-select';
import Button from '../button';
import TextInput from '../input';

export type MultipleSelectOption = {
  value: string | number;
  label: string;
  _?: any;
};

interface IProps extends TouchableOpacityProps {
  options?: MultipleSelectOption[];
  onChange?: (_: any[]) => void;
  searchLabel?: string;
  searchPlaceholder?: string;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: string;
  disabled?: boolean;
  value?: any[];
  closeCallback?: () => void;
  isSearchable?: boolean;
  isRequired?: boolean;
  isLoading?: boolean;
}

const SelectBoxItem = ({
  item,
  isSelected,
  onToggle,
}: {
  item: MultipleSelectOption;
  isSelected: boolean;
  onToggle: (item: MultipleSelectOption, action: 'add' | 'remove') => void;
}) => {
  const iconStyle = {
    borderRadius: 4,
  };
  const innerIconStyle = {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: isSelected ? colors.primary.default : colors.neutral.c500,
  };
  return (
    <TouchableOpacity
      onPress={() => {
        const action = isSelected ? 'remove' : 'add';
        onToggle(item, action);
      }}
      style={styles.selectItem}
    >
      <Text maxWidth={'90%'}>{item.label}</Text>
      <View pointerEvents="none">
        <BouncyCheckbox
          size={18}
          isChecked={isSelected}
          fillColor={colors.primary.default}
          unFillColor={colors.white}
          iconStyle={iconStyle}
          innerIconStyle={innerIconStyle}
          style={{ width: 18, height: 18 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const SelectBoxContent = ({
  options,
  searchLabel,
  searchPlaceholder,
  selectedOptions,
  onChange,
}: {
  options: MultipleSelectOption[];
  searchLabel: string;
  searchPlaceholder: string;
  selectedOptions: any[];
  onChange: (value: MultipleSelectOption[]) => void;
}) => {
  const { bottomSheetHeight3, closeBottomSheet3 } = useBottomSheetContext3();

  const [searchText, setSearchText] = useState('');
  const [localSelected, setLocalSelected] = useState<any[]>(
    selectedOptions || [],
  );
  const [isLoading] = useState(false);

  useEffect(() => {
    setLocalSelected(selectedOptions || []);
  }, [selectedOptions]);

  const filteredOptions = (options || []).filter(o =>
    removeAccents((o.label || '').toLowerCase()).includes(
      removeAccents((searchText || '').toLowerCase()),
    ),
  );

  const selectedMap = keyBy(localSelected, 'value');

  useEffect(() => {
    onChange(localSelected);
  }, [localSelected]);

  return (
    <View width="100%" height={bottomSheetHeight3}>
      {isLoading && (
        <View absolute center width="100%" height="100%">
          <ActivityIndicator color={colors.primary.default} />
        </View>
      )}

      {!isLoading && (
        <>
          <View paddingHorizontal={16}>
            <TextInput
              leftIcon={<SearchIcon color={colors.neutral.c300} />}
              label={searchLabel}
              placeholder={searchPlaceholder}
              rightIcon={<ArrowDown />}
              onChangeText={setSearchText}
            />
          </View>

          <View paddingHorizontal={16}>
            <Text paddingVertical={16} weight={600}>
              Tất cả ({filteredOptions?.length})
            </Text>
          </View>

          <View flex={1} paddingHorizontal={16}>
            <FlatList
              data={filteredOptions}
              keyExtractor={item => item.value.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <SelectBoxItem
                  isSelected={selectedMap[item.value] !== undefined}
                  key={item.value + item.label}
                  item={item}
                  onToggle={(selectedItem, action) => {
                    if (action === 'remove') {
                      setLocalSelected(prev =>
                        prev.filter(i => i.value !== selectedItem.value),
                      );
                    } else {
                      setLocalSelected(prev =>
                        uniqBy([...prev, selectedItem], 'value'),
                      );
                    }
                  }}
                />
              )}
            />
          </View>

          <View paddingTop={16} paddingBottom={48} paddingHorizontal={16}>
            <Button title="Đóng" onPress={closeBottomSheet3} />
          </View>
        </>
      )}
    </View>
  );
};

const MultipleSelect = (props: IProps) => {
  const {
    options = [],
    value = [],
    onChange,
    label,
    labelStyle,
    style,
    searchLabel = 'Tìm kiếm',
    searchPlaceholder = 'Nhập từ khoá',
    error,
    disabled,
    closeCallback,
  } = props;

  const { openBottomSheet3 } = useBottomSheetContext3();
  const valueRef = useRef<any[]>(value || []);

  const openSheet = () => {
    if (disabled) return;

    valueRef.current = value || [];

    openBottomSheet3({
      closeCallback,
      onChange: (item: any, action: 'remove' | 'add') => {
        if (action === 'remove') {
          valueRef.current = valueRef.current.filter(
            i => i.value !== item.value,
          );
        } else {
          valueRef.current = uniqBy([...valueRef.current, item], 'value');
        }

        onChange?.(valueRef.current);
      },
      content: (
        <SelectBoxContent
          selectedOptions={valueRef.current}
          options={options}
          searchLabel={searchLabel}
          searchPlaceholder={searchPlaceholder}
          onChange={onChange as any}
        />
      ),
    });
  };

  return (
    <TouchableOpacity onPress={openSheet} disabled={disabled} style={style}>
      <Text style={labelStyle}>{label}</Text>
      {error && <Text style={styles.error}>{error}</Text>}
    </TouchableOpacity>
  );
};

export default MultipleSelect;

const styles = StyleSheet.create({
  selectItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    fontSize: 12,
    color: colors.red.c600,
  },
});
