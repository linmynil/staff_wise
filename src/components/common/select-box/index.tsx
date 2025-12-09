import { cloneDeep } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import colors from '../../../utils/constants/colors';
import Text from '../../core/text';
import { useBottomSheetContext } from '../bottom-sheet';
import TextInput from '../input';
import View from '@components/core/view';
import { removeAccents } from '@utils/constants/string';
import { ArrowDown, SearchIcon } from '@assets';

interface IProps extends TextInputProps {
  options?: SelectOption[];
  isSearchable?: boolean;
  onChange?: (_: any) => void;
  searchLabel?: string;
  searchPlaceholder?: string;
  label?: string;
  error?: string | string[] | undefined | any;
  disabled?: boolean;
  isRequired?: boolean;
  fullValueInOnChange?: boolean;
  isLoading?: boolean;
  closeCallback?: () => void;
  autoOpen?: boolean;
}

export type SelectOption = {
  value: string | number;
  label: string;
};

const SelectBoxItem = ({ item }: { item: SelectOption }) => {
  const { onChangeRef, closeBottomSheet } = useBottomSheetContext();

  return (
    <Pressable
      onPress={() => {
        onChangeRef.current?.(item);
        closeBottomSheet();
      }}
      style={styles.selectItem}
    >
      <Text>{item.label}</Text>
    </Pressable>
  );
};

const SelectBoxContent = ({
  options,
  searchLabel,
  searchPlaceholder,
}: {
  options: SelectOption[];
  searchLabel: string;
  searchPlaceholder: string;
}) => {
  const { bottomSheetHeight, onUpdateStatusRef } = useBottomSheetContext();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onUpdateStatusRef.current = setIsLoading;
  }, [onUpdateStatusRef]);

  const filteredOptions = (options || []).filter(o =>
    removeAccents((o.label || '').toLowerCase()).includes(
      removeAccents((searchText || '').toLowerCase()),
    ),
  );

  return (
    <View width={'100%'} height={bottomSheetHeight}>
      {isLoading && (
        <View
          width={'100%'}
          height={'100%'}
          backgroundColor={'rgba(0,0,0,0.5)'}
          center
          absolute
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1000000}
        >
          <ActivityIndicator size="small" color={colors.primary.default} />
        </View>
      )}

      {!isLoading && (
        <>
          <View width={'100%'} paddingHorizontal={16} gap={8}>
            <TextInput
              leftIcon={<SearchIcon color={colors.neutral.c300} />}
              label={searchLabel}
              placeholder={searchPlaceholder}
              rightIcon={<ArrowDown />}
              onChangeText={setSearchText}
            />
          </View>

          <View paddingHorizontal={16} alignSelf="flex-start">
            <Text
              paddingVertical={16}
              align="left"
              color={colors.black}
              weight={600}
            >
              Tất cả ({filteredOptions?.length})
            </Text>
          </View>

          <View flex={1} width={'100%'} paddingHorizontal={16} gap={8}>
            {filteredOptions?.length > 0 && (
              <FlatList
                data={filteredOptions}
                renderItem={({ item }) => (
                  <SelectBoxItem key={item.value + item.label} item={item} />
                )}
                keyExtractor={item => item?.value?.toString()}
              />
            )}
          </View>

          <View height={60} />
        </>
      )}
    </View>
  );
};

const SelectBox = ({ ...props }: IProps) => {
  const { openBottomSheet } = useBottomSheetContext();

  const {
    options = [],
    value,
    onChange,
    placeholder,
    label,
    searchLabel = 'label',
    searchPlaceholder = 'placeholder',
    error = undefined,
    disabled,
    isRequired,
    fullValueInOnChange,
    isLoading,
    closeCallback,
    autoOpen,
  } = props;

  const textValue = options.find(o => o.value === value)?.label || '';

  const onOpenSelectbox = (os?: SelectOption[]) => {
    if (disabled) return;

    openBottomSheet({
      closeCallback,
      onChange: (item: any) => {
        onChange && onChange(fullValueInOnChange ? item : item.value);
      },
      content: (
        <SelectBoxContent
          options={os || options}
          searchLabel={searchLabel}
          searchPlaceholder={searchPlaceholder}
        />
      ),
    });
  };

  useEffect(() => {
    if (autoOpen && options?.[0]?.value) {
      const _options = cloneDeep(options);
      setTimeout(() => onOpenSelectbox(_options), 300);
    }
  }, [options?.[0]?.value, autoOpen]);

  return (
    <Fragment>
      <Pressable onPress={() => onOpenSelectbox()}>
        <View pointerEvents="none">
          <TextInput
            label={label}
            placeholder={placeholder}
            value={textValue}
            rightIcon={
              isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={colors.primary.default}
                />
              ) : (
                <ArrowDown color={colors.neutral.c700} />
              )
            }
            pointerEvents="none"
            error={error}
            disabled={disabled}
            isRequired={isRequired}
          />
        </View>
      </Pressable>
    </Fragment>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  selectItem: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.neutral.c300,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 4,
  },
});
