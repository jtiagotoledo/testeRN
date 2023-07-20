import { Text, View, Button, TextInput, NativeSyntheticEvent,TextInputChangeEventData } from "react-native"
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Chip } from '@rneui/themed';

import CustomChips from "./CustomChips";
import MyComponent from "./MyComponent";

function Classes({navigation}: {navigation: any}) {
    
  const [value,setValue] = useState<string>('')
  //const  listaClasses:any=['7D','7E','7F'];
  //let teste= 'oi'

  const handleOnChangeInput = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
      setValue(event.nativeEvent.text);
  }

    
  const onPressAdd = () =>{
      const usersCollection = firestore()
      .collection('Users')
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Classes</Text>
      <Chip key={'7A'} title='7A'/>
      <CustomChips></CustomChips>
      <TextInput onChange={handleOnChangeInput}></TextInput>
      <Button onPress={onPressConsultar} title='Consultar alunos'/>
      <Button onPress={onPressAdd} title='Add Classe'/>
      {/* <Button onPress={alterarValor2} title='alterarString'/> */}
      {/* <MyComponent></MyComponent> */}
      
    </View>
  );
}

export default Classes;