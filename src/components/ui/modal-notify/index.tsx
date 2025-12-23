import Button from '@components/common/button';
import { useModal } from '@components/common/modal';
import View from '@components/core/view';
import { width } from '@utils/helpers/dimension';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text } from 'react-native';

export interface NotifyOptions {
  title: string;
  content?: string;
  duration?: number; // ms
  onDone?: () => void;
  titleButton?: string;
  imgSource?: ImageSourcePropType | undefined;
  closeOnPressWrapper?: boolean;
}

const ModalNotify = ({
  title,
  content,
  duration = 0,
  titleButton,
  imgSource,
  onDone,
}: NotifyOptions) => {
  const { modalControl } = useModal();

  React.useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      modalControl?.close();
      onDone?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <View style={{ alignItems: 'center', gap: 24 }}>
      <View center gap={4}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>{title}</Text>
        {content && <Text style={{ textAlign: 'center' }}>{content}</Text>}
      </View>
      <Image
        style={styles.img}
        source={imgSource || require('@assets/images/img-modal-notify.png')}
      />
      <Button
        title={titleButton || 'Done'}
        onPress={() => {
          modalControl?.close();
          onDone && onDone();
        }}
      />
    </View>
  );
};

export default ModalNotify;

const styles = StyleSheet.create({
  img: {
    width: width * 0.7,
    height: width * 0.7,
  },
});
