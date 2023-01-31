import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import unsplashLogo from './assets/unsplash-logo.png';

import HomeScreen from './src/screens/HomeScreen';
import ImageScreen from './src/screens/ImageScreen';
import { useState } from 'react';

const Stack = createNativeStackNavigator()

export default function App() {

  const [openSearch, setOpenSearch] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ='HomeScreen'
          options={{
            headerLeft: () => <Image 
              source={unsplashLogo}
              style={styles.logo} />,
            headerRight: () => (
              <Text
                style={{ color: "black", fontSize: 18}}
                onPress={() => setOpenSearch(!openSearch)}
>
                  {openSearch ? "Close" : "Search"}
              </Text>
            ),
            title: "Images App",

          }}
      > 
      {(props) => < HomeScreen {...props} openSearch={openSearch} />}
      </Stack.Screen>
        <Stack.Screen name ='ImageScreen' component={ImageScreen} 
          options={{
            title: "Image Detail"
          }}
        
        
        />
      </Stack.Navigator>
      <StatusBar/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 37,
    height: 37,
    marginEnd: 5,
    borderRadius: 5
  }
});
