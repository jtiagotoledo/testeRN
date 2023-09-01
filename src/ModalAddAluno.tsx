import { Text, View, StyleSheet, Pressable, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import React, { useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";

const ModalAddAluno = () =>{

    const [valueNumero,setValueNumero] = useState<string>('')
    const [valueNome,setValueNome] = useState<string>('')
    const {periodoSelec,classeSelec,modalAluno,setModalAluno} = useContext(Context)

    const onChangeInputNumero = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setValueNumero(event.nativeEvent.text);
    }
    const onChangeInputNome = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
      setValueNome(event.nativeEvent.text);
    }
    
    const onPressAddAluno = () =>{
      if(valueNumero!='' && valueNome!=''){
        firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .doc(classeSelec).collection('ListaAlunos')
        .doc(valueNumero).set({
          numero: valueNumero,
          nome: valueNome
        });
        setModalAluno(!modalAluno);
        console.log('função adicionar',valueNome);
      }
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAluno}
                onRequestClose={() => {
                setModalAluno(!modalAluno);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Adicione um novo aluno:</Text>
                        <TextInput placeholder='Número' onChange={onChangeInputNumero} style={{backgroundColor:'#d3d3d3', minWidth:100, marginBottom:20}}></TextInput>
                        <TextInput placeholder='Nome' onChange={onChangeInputNome} style={{backgroundColor:'#d3d3d3', minWidth:100, marginBottom:20}}></TextInput>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onPressAddAluno}>
                            <Text style={styles.textStyle}>Criar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
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

export default ModalAddAluno