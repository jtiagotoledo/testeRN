import {Button, Text, TextInput, View,NativeSyntheticEvent,TextInputChangeEventData} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';


const App = () => {
  let valor = ''
  const [value,setValue] = useState<string>('')

  const handleOnChangeInput = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
    setValue(event.nativeEvent.text)
    valor = event.nativeEvent.text
    console.log(valor)
  }
  const onPress = () =>{
    const usersCollection = firestore()
    .collection('Users')
    .doc(value)
    .set({
    });
    console.log('entrou na função');
    console.log(value);
  }
  
  
  return (
    <View>
      <Text>Olá!320</Text>
      <TextInput onChange={handleOnChangeInput}></TextInput>
      <Button onPress={onPress} title='ADD'/>
    </View>
    
  );
};

export default App;
