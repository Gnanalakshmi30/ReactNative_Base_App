import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import BottomTabs from '../navigation/bottomBar';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/toastMessage';
import RNSecureStorage from 'rn-secure-storage';
import { ThemeContext } from '../contexts/ThemeContext';
import { Appearance } from 'react-native';
import Colors from '../styles/palette';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../contexts/globalStore";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [theme, setTheme] = useState({ mode: "light", primaryColor: Colors.lightSeaGreenColor });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };

    } else {
      if (newTheme.system) {
        const systemColorScheme = Appearance.getColorScheme();
        mode = systemColorScheme === "dark" ? "dark" : "light";
        newTheme = { ...newTheme, mode };

      } else {
        newTheme = { ...newTheme, system: false };
      }
    }
    setTheme(newTheme);

  }

  if (theme.system) {
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({
        system: true, mode: colorScheme
      });

    });

  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await RNSecureStorage.getItem('jwtToken');
        if (token) {
          setInitialRoute('BottomTabs');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        setInitialRoute('Login');
      }
    };

    checkToken();
  }, []);

  if (initialRoute === null) {
    return null;
  }
  return (

    <ReduxProvider store={store}>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="BottomTabs" component={BottomTabs} />
            </Stack.Navigator>
            <Toast config={toastConfig} />
          </NavigationContainer>
        </PaperProvider>
      </ThemeContext.Provider>
    </ReduxProvider>



  )
}

export default App






