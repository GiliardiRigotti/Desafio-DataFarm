import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { NotifierWrapper } from 'react-native-notifier';
import { AppProvider } from './src/context/App';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (

    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <StatusBar />
      <NavigationContainer>
        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </SafeAreaView>

  );
}
