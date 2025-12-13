import { ArrowDown, CircleCloseIcon, SearchIcon } from '@assets';
import View from '@components/core/view';
import { removeAccents } from '@utils/constants/string';
import { keyBy, uniqBy } from 'lodash';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
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
  title: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: string | string[];
  disabled?: boolean;
  value?: Array<string | number>;
  closeCallback?: () => void;
  isSearchable?: boolean;
  isRequired?: boolean;
  isLoading?: boolean;
  maxCount?: number;
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
  selectedOptions,
  searchLabel,
  searchPlaceholder,
  onChange,
}: {
  options: MultipleSelectOption[];
  selectedOptions: MultipleSelectOption[];
  searchLabel: string;
  searchPlaceholder: string;
  onChange: (value: MultipleSelectOption[]) => void;
}) => {
  const { bottomSheetHeight3, closeBottomSheet3 } = useBottomSheetContext3();

  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] =
    useState<MultipleSelectOption[]>(selectedOptions);

  const selectedMap = React.useMemo(() => keyBy(selected, 'value'), [selected]);

  const filteredOptions = React.useMemo(() => {
    const keyword = removeAccents(searchText.toLowerCase());
    return options.filter(o =>
      removeAccents(o.label.toLowerCase()).includes(keyword),
    );
  }, [options, searchText]);

  const updateSelected = (next: MultipleSelectOption[]) => {
    setSelected(next);
    onChange(next);
  };

  const toggleItem = (item: MultipleSelectOption) => {
    if (selectedMap[item.value]) {
      updateSelected(selected.filter(i => i.value !== item.value));
    } else {
      updateSelected([...selected, item]);
    }
  };

  const selectAll = () => {
    updateSelected(uniqBy([...selected, ...filteredOptions], 'value'));
  };

  const clearAll = () => {
    const removeSet = new Set(filteredOptions.map(i => i.value));
    updateSelected(selected.filter(i => !removeSet.has(i.value)));
  };

  return (
    <View width="100%" height={bottomSheetHeight3}>
      <View paddingHorizontal={16}>
        <TextInput
          label={searchLabel}
          placeholder={searchPlaceholder}
          leftIcon={<SearchIcon color={colors.neutral.c300} />}
          onChangeText={setSearchText}
        />
      </View>
      <View paddingHorizontal={16} paddingVertical={12} row space_between>
        <Text weight={600}>All ({filteredOptions.length})</Text>

        <View row gap={16}>
          <TouchableOpacity onPress={selectAll}>
            <Text color={colors.primary.default}>Select all</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={clearAll}>
            <Text color={colors.red.c600}>Deselect</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View flex={1} paddingHorizontal={16}>
        <FlatList
          data={filteredOptions}
          keyExtractor={i => i.value.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SelectBoxItem
              item={item}
              isSelected={!!selectedMap[item.value]}
              onToggle={() => toggleItem(item)}
            />
          )}
        />
      </View>
      <View padding={16} paddingBottom={48}>
        <Button title="Done" onPress={closeBottomSheet3} />
      </View>
    </View>
  );
};

const MultipleSelect = (props: IProps) => {
  const {
    options = [],
    value = [],
    onChange,
    title,
    labelStyle,
    style,
    searchLabel = 'Search',
    searchPlaceholder = 'Enter keywords',
    error,
    disabled,
    isLoading,
    isRequired,
    maxCount = 2,
    closeCallback,
  } = props;

  const { openBottomSheet3 } = useBottomSheetContext3();

  const optionMap = useMemo(() => keyBy(options, 'value'), [options]);

  const removeValue = (val: string | number) => {
    onChange?.(value.filter(v => v !== val));
  };

  const removeHiddenValues = () => {
    onChange?.(value.slice(0, maxCount));
  };

  const openSheet = () => {
    if (disabled) return;

    openBottomSheet3({
      closeCallback,
      content: (
        <SelectBoxContent
          options={options}
          selectedOptions={value.map(v => optionMap[v]).filter(Boolean)}
          searchLabel={searchLabel}
          searchPlaceholder={searchPlaceholder}
          onChange={selected => onChange?.(selected.map(i => i.value))}
        />
      ),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={labelStyle}>
        {title} {isRequired && <Text color={colors.red.c500}>*</Text>}
      </Text>

      <Pressable
        onPress={openSheet}
        disabled={disabled}
        style={[
          styles.multiPicker,
          style,
          { borderColor: error ? colors.red.c600 : colors.neutral.c300 },
          disabled && styles.disabled,
        ]}
      >
        <View row center flex={1}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View row gap={8} paddingLeft={12}>
              {value.length > 0 ? (
                <>
                  {value.slice(0, maxCount).map(v => {
                    const label = optionMap[v]?.label;
                    if (!label) return null;

                    return (
                      <View
                        key={v.toString()}
                        style={styles.selectedLabel}
                        row
                        center
                        gap={6}
                      >
                        <Text color={colors.white}>{label}</Text>
                        <TouchableOpacity
                          onPress={() => removeValue(v)}
                          hitSlop={8}
                        >
                          <CircleCloseIcon fill={colors.white} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                  {value.length > maxCount && (
                    <View
                      style={[
                        styles.selectedLabel,
                        {
                          backgroundColor: colors.white,
                          borderWidth: 1,
                          borderColor: colors.neutral.c500,
                        },
                      ]}
                      row
                      center
                      gap={6}
                    >
                      <Text color={colors.black}>
                        + {value.length - maxCount}
                      </Text>
                      <TouchableOpacity
                        onPress={removeHiddenValues}
                        hitSlop={8}
                      >
                        <CircleCloseIcon fill={colors.black} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              ) : (
                <Text color={colors.neutral.c500} marginLeft={3}>
                  Select {title.toLowerCase()}
                </Text>
              )}
            </View>
          </ScrollView>

          <View style={styles.arrow}>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary.default} />
            ) : (
              <ArrowDown color={colors.neutral.c700} />
            )}
          </View>
        </View>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default MultipleSelect;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 100,
    gap: 4,
  },
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
  multiPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderRadius: 24,
    gap: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  selectedLabel: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.primary.default,
  },
  arrow: {
    width: 30,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: colors.neutral.c500,
    marginRight: 6,
  },
});
