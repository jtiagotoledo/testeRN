import { Text, View, Button, ScrollView, TextInput, NativeSyntheticEvent,TextInputChangeEventData, FlatList } from "react-native"
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';

import CustomChips from "./CustomChips";

function Classes() {
    
  let [value,setValue] = useState<string>('')

  const handleOnChangeInput = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
      setValue(event.nativeEvent.text);
  }

    
  const onPressAdd = () =>{
      const usersCollection = firestore()
      .collection('Classes')
      .doc(value)
      .set({
        nome: 'Tiago',
        idade: '36'
      });
      console.log('função adicionar',value);
      
  }

    
  const onPressConsultar = async () => {
    try {
      const snapshot = await firestore().collection('Users').get();
      const data = snapshot.docs.map((doc) => doc.data());
      console.log('Dados lidos:', data);
    } catch (error) {
      console.error('Erro ao ler dados:', error);
    }
  };

  return (
    <View style={{  alignItems: 'center', justifyContent: 'center' }}>
      <Text>Classes</Text>
      <CustomChips></CustomChips>
     
      <TextInput onChange={handleOnChangeInput} style={{backgroundColor:'gray'}}></TextInput>
      <Button onPress={onPressConsultar} title='Consultar alunos'/>
      <Button onPress={onPressAdd} title='Add Classe'/>
     
      
    </View>
  );
}

export default Classes;