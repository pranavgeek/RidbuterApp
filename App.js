import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './components/login';
import MainApp from './components/mainApp';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} options={{ 
          headerLeft: null,
          headerTitle: "Ridbuter",
          headerStyle: {
            backgroundColor: '#2a52be',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            marginLeft: -170
          },
          }}/>
        <Stack.Screen name="Ridbuter" component={MainApp} options={{ 
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#2a52be'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            marginLeft: -170
          },
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
