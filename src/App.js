/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import GlobalStyles from './utils/GlobalStyles';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';
import { LogBox } from 'react-native';
import Splash from './screens/Splash';
import ToDo from './screens/ToDo';
import Done from './screens/Done';
import Task from './screens/Task';
import CameraVision from './screens/Camera';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


const Tab = createBottomTabNavigator();

const Home = () => {

  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let IconName;
            if (route.name == "ToDo") {
              IconName = "list";
            } else {
              IconName = "check";
            }
            size = focused ? 26 : 20;
            return <Icon name={IconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0080ff",
        })
      }

    >
      <Tab.Screen
        name="ToDo"
        component={ToDo}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Done"
        component={Done}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}


const Stack = createStackNavigator();

const App = () => {

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Splash'
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#0080ff"
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontSize: 25,
              ...GlobalStyles.CustomFont,
            }
          }}

        >
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="My Tasks"
            component={Home}
            options={{
              headerShown: true,
              headerLeft: false,
            }}
          />
          <Stack.Screen
            name="Task"
            component={Task}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Camera"
            component={CameraVision}
            options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


export default App;
