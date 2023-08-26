import { View, StyleSheet, Button, TextInput, NativeSyntheticEvent,TextInputChangeEventData} from "react-native"
import firestore from '@react-native-firebase/firestore';
import React, { useState} from 'react';
import DropDown from "./DropDown";
import BtnAddPeriodo from "./BtnAddPeriodo";
import ModalAddPeriodo from "./ModalAddPeriodo";
import Globais from './Globais'
import Provider from "./data/Provider";
import CustomChips from "./CustomChips";

function Classes() {
    
  const [valueClasse,setValueClasse] = useState<string>('')

  const handleOnChangeInputClasse = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
      setValueClasse(event.nativeEvent.text);
  }
  const onPressAddClasse = () =>{
      firestore()
      .collection('Usuario')
      .doc(Globais.periodSelec)
      .collection('Classes')
      .doc(valueClasse)
      .set({
        nome: 'Tiago',
        idade: '36'
      });
      console.log('função adicionar',valueClasse);
  }
    
  const onPressConsultar = async () => {
    try {
      const snapshot = await firestore().collection('Usuario').get();
      const data = snapshot.docs.map((doc) => doc.data());
      console.log('Dados lidos:', data);
    } catch (error) {
      console.error('Erro ao ler dados:', error);
    }
  };

  return (
    <Provider>
      <View style={{   justifyContent: 'center' }}>
        <View style={styles.contDropBtnAddPer}>
          <DropDown ></DropDown>
          <BtnAddPeriodo/>
        </View>
        <TextInput onChange={handleOnChangeInputClasse} style={{backgroundColor:'#d3d3d3'}}></TextInput>
        <Button onPress={onPressAddClasse} title='Add Classe'/>
        {/* <Button onPress={onPressConsultar} title='Consultar alunos'/> */}
        <ModalAddPeriodo></ModalAddPeriodo>
        <CustomChips></CustomChips>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:16,
    marginBottom:16,
    marginRight:16
  },
  contDropBtnAddPer:{
    flexDirection:'row',
    backgroundColor:'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Classes;