import 'react-native-gesture-handler'; // Importing the react-native-gesture-handler package
import 'intl'; // Importing the intl package
import 'intl/locale-data/jsonp/pt-BR'; // Importing the intl/locale-data/jsonp/pt-BR package

import React, { useState } from 'react'; // Importing React
import { StatusBar } from 'react-native'; // Importing the StatusBar component from react-native
import AppLoading from 'expo-app-loading'; // Importing the AppLoading component from expo-app-loading
import { ThemeProvider } from 'styled-components'; // ThemeProvider is a component that allows us to pass a theme to all styled components in our application
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'; // Importing the fonts

import { NewsProvider } from './src/context/NewsContext'; // Importing the NewsProvider component
import theme from './src/global/styles/theme'; // Importing the theme object
import { NavigationContainer } from '@react-navigation/native'; // Importing the NavigationContainer component from @react-navigation/native
import { AppRoutes } from './src/routes/app.routes'; // Importing the AppRoutes component
import { FeedProvider } from './src/context/FeedContext'; // Importing the FeedProvider component

export default function App() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold 
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NewsProvider value={{ selectedNews, setSelectedNews }}>
        <FeedProvider value={{ selectedFeed, setSelectedFeed }}>
          <NavigationContainer>
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
            />
            <AppRoutes />
          </NavigationContainer>
        </FeedProvider>
      </NewsProvider>
    </ThemeProvider>
  );
}
