import React from 'react'
import App from './App';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={() => ({
            headerShown:false
        })
    }>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="App" component={App} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default Routes;