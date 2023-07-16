import {Button, Text, TextInput, View,NativeSyntheticEvent,TextInputChangeEventData} from 'react-native';
import React, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

//const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {

 /*  let valor = ''
  const [value,setValue] = useState<string>('')

  const handleOnChangeInput = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
    setValue(event.nativeEvent.text)
    valor = event.nativeEvent.text
    console.log(valor)
  }

  
  const onPressAdd = () =>{
    const usersCollection = firestore()
    .collection('Users')
    .doc(value)
    .set({
    });
    console.log('entrou na função');
    console.log(value);
  } */
  
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
        
    //<Text>Olá!32</Text>
    //<TextInput onChange={handleOnChangeInput}></TextInput>
    //<Button onPress={onPressAdd} title='ADD'/>
  );
};

export default App;
