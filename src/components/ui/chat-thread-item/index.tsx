import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import { isToday } from '@utils/helpers/date.helper';
import { ChatThread } from '@utils/types/chat.type';
import dayjs from 'dayjs';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IProps extends TouchableOpacityProps {
  item: ChatThread;
}

const ChatThreadItem = ({ item, ...props }: IProps) => {
  const {
    title,
    lastMessage: { content, createdAt },
  } = item;

  const dateTime = isToday(createdAt)
    ? dayjs(createdAt).format('HH:mm')
    : `${dayjs(createdAt).date()} thg ${dayjs(createdAt).month() + 1}`;

  return (
    <TouchableOpacity {...props} style={[styles.container]}>
      <View flex={1} row space_between gap={12}>
        <View>
          <Image
            source={require('@assets/images/draggle-img.png')}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
          />
        </View>

        <View flex={1}>
          <View gap={4} row space_between>
            <Text weight={600} numberOfLines={1} style={{ flex: 1 }}>
              {title}
            </Text>
            <Text weight={600}>{dateTime}</Text>
          </View>

          <Text size={12} weight={600} numberOfLines={1} color={colors.neutral.c500}>
            {content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ChatThreadItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: colors.neutral.c500,
    borderRadius: 12,
    padding: 10,
    gap: 4,
  },
});
