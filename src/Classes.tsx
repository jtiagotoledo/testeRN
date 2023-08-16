import { Text, View, StyleSheet, Pressable, Button, TextInput, NativeSyntheticEvent,TextInputChangeEventData, Modal } from "react-native"
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';

import CustomChips from "./CustomChips";
import DropDown from "./DropDown";
import BtnAddPeriodo from "./BtnAddPeriodo";
import Globais from './Globais'

function Classes() {
    
  let [valueClasse,setValueClasse] = useState<string>('')
  let [valuePeriodo,setValuePeriodo] = useState<string>('')

  const [modalVisible, setModalVisible] = useState(false);

  const handleOnChangeInputClasse = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
      setValueClasse(event.nativeEvent.text);
  }

  const handleOnChangeInputPeriodo = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
    setValuePeriodo(event.nativeEvent.text);
  }

  const onPressAddPeriodo = () =>{
    firestore()
    .collection('Usuario')
    .doc(valuePeriodo)
    
    .set({
      
    })
    
    setModalVisible(!modalVisible);
    console.log('função adicionar período',valuePeriodo);
    
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
      const snapshot = await firestore().collection('Classes').get();
      const data = snapshot.docs.map((doc) => doc.data());
      console.log('Dados lidos:', data);
    } catch (error) {
      console.error('Erro ao ler dados:', error);
    }
  };

  return (
    <View style={{   justifyContent: 'center' }}>
      <View style={{ flexDirection:'row', backgroundColor:'white'}}>
        <DropDown ></DropDown>
        
        {/* <Pressable
        style={[styles.button, styles.buttonOpen, styles.container]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>+</Text>
        </Pressable> */}
      </View>
      <BtnAddPeriodo></BtnAddPeriodo>
      {/* <CustomChips></CustomChips> */}
     
      <TextInput onChange={handleOnChangeInputClasse} style={{backgroundColor:'#d3d3d3'}}></TextInput>
      <Button onPress={onPressConsultar} title='Consultar alunos'/>
      <Button onPress={onPressAddClasse} title='Add Classe'/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Crie um novo período:</Text>
            <TextInput onChange={handleOnChangeInputPeriodo} style={{backgroundColor:'#d3d3d3', minWidth:100, marginBottom:20}}></TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPressAddPeriodo}>
              <Text style={styles.textStyle}>Criar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      
    </View>
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