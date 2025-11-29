import { MainRoutes } from '@navigation/routes';
import colors from '@utils/constants/colors';
import {
  height as SCREEN_HEIGHT,
  width as SCREEN_WIDTH,
} from '@utils/helpers/dimension';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const DRAGGABLE_SIZE = 60;

type DraggableChatbotProps = {
  navigation: any;
  onClose?: () => void;
};

export const DraggableChatbot = ({
  navigation,
}: // onClose,
DraggableChatbotProps) => {
  const x = useSharedValue(SCREEN_WIDTH - DRAGGABLE_SIZE - 5);
  const y = useSharedValue(SCREEN_HEIGHT * 0.65);

  const context = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: x.value, y: y.value };
    })
    .onUpdate(e => {
      x.value = context.value.x + e.translationX;
      const minY = 0;
      const maxY = SCREEN_HEIGHT - DRAGGABLE_SIZE - 180;
      let newY = context.value.y + e.translationY;

      if (newY < minY) newY = minY;
      if (newY > maxY) newY = maxY;

      y.value = newY;
    })
    .onEnd(() => {
      const toRight = x.value > SCREEN_WIDTH / 2;
      x.value = withSpring(toRight ? SCREEN_WIDTH - DRAGGABLE_SIZE - 5 : 5);

      if (y.value < 0) y.value = withSpring(0);
      if (y.value > SCREEN_HEIGHT - DRAGGABLE_SIZE)
        y.value = withSpring(SCREEN_HEIGHT - DRAGGABLE_SIZE);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value,
    top: y.value,
  }));

  // const closeButtonStyle = useAnimatedStyle(() => {
  //   const isRight = x.value > SCREEN_WIDTH / 2;

  //   return {
  //     position: 'absolute',
  //     top: -17,
  //     transform: [
  //       {
  //         translateX: withSpring(isRight ? DRAGGABLE_SIZE - 15 : -5, {
  //           damping: 15,
  //           stiffness: 150,
  //         }),
  //       },
  //     ],
  //     opacity: withSpring(1, { damping: 15, stiffness: 150 }),
  //     width: 20,
  //     height: 20,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: colors.primary.c200,
  //     borderRadius: 12,
  //     borderWidth: 1,
  //     borderColor: colors.white,
  //   };
  // });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        {/* <Animated.View style={closeButtonStyle}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={onClose}
          >
            <CloseIcon
              width={16}
              height={16}
              viewBox="0 0 20 21"
              color={colors.white}
            />
          </TouchableOpacity>
        </Animated.View> */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.getParent().navigate(MainRoutes.CHAT_MAIN)}
        >
          <Animated.View style={styles.icon}>
            <Image
              source={require('@assets/images/draggle-img.png')}
              style={{
                width: 55,
                height: 55,
                resizeMode: 'contain',
              }}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    zIndex: 999,
  },
  icon: {
    width: DRAGGABLE_SIZE,
    height: DRAGGABLE_SIZE,
    borderRadius: DRAGGABLE_SIZE / 2,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary.c500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
});
