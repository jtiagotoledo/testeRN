import { Text, View, Button, TextInput, NativeSyntheticEvent,TextInputChangeEventData } from "react-native"
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Chip } from '@rneui/themed';

import CustomChips from "./CustomChips";

function Classes({navigation}: {navigation: any}) {
    
  const [value,setValue] = useState<string>('')
  const  listaClasses:any=['7D','7E','7F'];

  const handleOnChangeInput = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
      setValue(event.nativeEvent.text)
      //valor = event.nativeEvent.text
      //console.log(valor)
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

 

  useEffect(()=>{

    firestore().collection('Users').get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
          listaClasses.push(documentSnapshot.id);
          /* chips = listaClasses.map((classe) =>
            (classe)); */
                
              });
              console.log('listaClasses:',listaClasses);
              //CustomChips(listaClasses)
              //return listaClasses;

              
            });
            
            //return <View>{chips}</View>;
  },[listaClasses])

  const listar = () =>{
    console.log('testeLista',listaClasses)
  }



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Classes</Text>
      <Chip title='7A'/>
      <CustomChips title={listaClasses}></CustomChips>
      <TextInput onChange={handleOnChangeInput}></TextInput>
      <Button onPress={onPressConsultar} title='Consultar alunos'/>
      <Button onPress={onPressAdd} title='Add Classe'/>
      <Button onPress={listar} title='teste'/>
      
    </View>
  );
}

export default Classes;