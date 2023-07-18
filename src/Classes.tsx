import { Text, View, Button, TextInput, NativeSyntheticEvent,TextInputChangeEventData } from "react-native"
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { Chip, withTheme, lightColors } from '@rneui/themed';

function Classes({navigation}: {navigation: any}) {
    
  const [value,setValue] = useState<string>('')
  const  listaClasses:string[] = []
  let chips:any;

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

  const onPressListarClasses = () =>{

    firestore().collection('Users').get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
          //console.log('User ID: ', documentSnapshot.id);
          listaClasses.push(documentSnapshot.id);
          chips = listaClasses.map((classe) =>
                <Chip key={classe} title={classe}/>  );
                
              });
              console.log('chips: ',chips);
              return (<View>{chips}</View>);
            });
      //console.log('lista de classes',listaClasses);
  }

  function listarClasses (){

    firestore().collection('Users').get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
          //console.log('User ID: ', documentSnapshot.id);
          listaClasses.push(documentSnapshot.id);
          chips = listaClasses.map((classe) =>
                <Chip key={classe} title={classe}/>  );
                
              });
              console.log('chips: ',chips);
              return <View>{chips}</View>;
            });
      //console.log('lista de classes',listaClasses);
  }

  


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Classes</Text>
      <Chip title='7A'/>
      <TextInput onChange={handleOnChangeInput}></TextInput>
      <Button onPress={onPressConsultar} title='Consultar alunos'/>
      <Button onPress={onPressAdd} title='Add Classe'/>
      <Button onPress={onPressListarClasses} title='Listar Classes'/>
      
    </View>
  );
}

export default Classes;