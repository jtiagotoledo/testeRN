import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, Text } from "react-native"
import Globais from "./Globais";
import HeaderNotas from "./HeaderNotas";
import FlatListClasses from "./FlatListClasses";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notas = () =>{

  const[lista,setLista]=useState('');
  const[valor,setValor]=useState('');


  const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(valor);
        await AsyncStorage.setItem('my-key', jsonValue);
      } catch (e) {
        // saving error
      }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('chave');
      console.log(jsonValue);
      setLista(jsonValue||'')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  return(
      <View style={styles.container}>
          <HeaderNotas title="Notas"></HeaderNotas>
          <FlatListClasses></FlatListClasses>
          <Button title='salvar valores' onPress={()=>storeData()}></Button>
          <TextInput placeholder="digite" onChangeText={(item)=>setValor(item)}></TextInput>
          <Button title='pegar valores' onPress={()=>getData()}></Button>
          <Text>{lista}</Text>
      </View>
  )
}



const styles = StyleSheet.create({
    container:{
      backgroundColor: Globais.corSecundaria,
      flex:1,
    },
    text:{
        fontSize:20,
        padding:5,
        color: Globais.corTextoEscuro,
      },
});

export default Notas;