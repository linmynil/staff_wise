/* eslint-disable react-hooks/rules-of-hooks */
import { BottomSheetProvider, Message, ModalProvider } from '@components';
import Text from '@components/core/text';
import View from '@components/core/view';
import configDayJS from '@config/day';
import { useGlobalError } from '@hooks';
import store, { persistor } from '@redux/store';
import colors from '@utils/constants/colors';
import { Image, StyleSheet } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetProvider2 from '@components/common/bottom-sheet-outside';
import RootNavigator from '@navigation';
import BootSplash from 'react-native-bootsplash';
import { useEffect } from 'react';

configDayJS();

const toastConfig = {
  info: (props: any) => <Message {...props} />,
  error: (props: any) => <Message {...props} />,
};

const FallbackComponent = ({ error }: { error?: any }) => {
  return (
    <SafeAreaView>
      <View
        width={'100%'}
        height={'100%'}
        center
        backgroundColor={colors.white}
        paddingHorizontal={16}
        gap={8}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={require('@assets/images/error.png')}
        />
        <Text color={colors.neutral.c700}>
          {'Uh oh! There was an error :('}
        </Text>
        <Text style={styles.error}>{error ? error.toString() : ''}</Text>
        <View height={100} />
      </View>
    </SafeAreaView>
  );
};

const AppContent = () => {
  const error = useGlobalError();
  if (error) {
    return <FallbackComponent error={error} />;
  }

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <ErrorBoundary
      onError={(_error: any) => {
        try {
          console.log('App Crashed with reason: ' + _error);
        } catch (e) {
          console.log('Can not send the error to appsignal with error: ' + e);
        }
      }}
      FallbackComponent={FallbackComponent}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetProvider>
              <BottomSheetProvider2>
                <ModalProvider>
                  <RootNavigator />
                  <Toast config={toastConfig} />
                </ModalProvider>
              </BottomSheetProvider2>
            </BottomSheetProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

const App = () => <AppContent />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    color: 'red',
  },
});

export default App;
