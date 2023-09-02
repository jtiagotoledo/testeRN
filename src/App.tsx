import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {Icon} from './Icon'
import Classes from './Classes';
import Frequencia from './Frequencia';
import Notas from './Notas';
import Provider from "./data/Provider";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            headerShown:false,
            headerRight: () => {
              return <Icon style={styles.iconDelete} name={'bin'} size={25} color={'blue'}
              onPress={()=>''}></Icon>;
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName='';

              if (route.name === 'Classes') {
                iconName = 'book'
              } else if (route.name === 'Frequencia') {
                iconName = 'calendar'
              }else if (route.name === 'Notas') {
                iconName = 'pencil'
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Classes" component={Classes}></Tab.Screen>
          <Tab.Screen name="Frequencia" component={Frequencia} />
          <Tab.Screen name="Notas" component={Notas} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  iconDelete:{
    paddingRight:16
}
});

export default App;
