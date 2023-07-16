import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from './Icon'

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import AddAluno from './AddAluno';
import Frequencia from './Frequencia';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddAluno" component={AddAluno} />
      </Stack.Navigator> */}
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Classes') {
            iconName = 'book'
          } else if (route.name === 'Alunos') {
            iconName = 'user-plus'
          }else if (route.name === 'Frequencia') {
            iconName = 'list2'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Classes" component={HomeScreen} />
        <Tab.Screen name="Alunos" component={AddAluno} />
        <Tab.Screen name="Frequencia" component={Frequencia} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
