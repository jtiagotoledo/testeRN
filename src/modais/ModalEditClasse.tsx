import { Text, View, StyleSheet, Pressable, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid, TouchableOpacity } from "react-native"
import React, { useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from "../data/Globais";
import { Icon } from "../componentes/Icon";


const ModalEditClasse = () =>{

    const [valueClasse,setValueClasse] = useState<string>('')
    const {modalEditClasse,setModalEditClasse,periodoSelec,
      setRecarregarClasses,idUsuario,setClasseSelec,classeSelec} = useContext(Context)

    const onChangeInputClasse = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setValueClasse(event.nativeEvent.text);
      }
    
    const onPressEditClasse = async () =>{
      if(valueClasse!=''){

        firestore().collection(idUsuario)
        .doc(periodoSelec).collection('Classes')
        .doc(classeSelec).update({
          classe:valueClasse
        })

        // ref doc antigo
        const oldDocRef = firestore().collection(idUsuario)
        .doc(periodoSelec).collection('Classes').doc(classeSelec)
        // dados do documento antigo
        const oldDocSnapshot = await oldDocRef.get();
        const data = oldDocSnapshot.data();
        // novo doc
        const newDocRef = firestore().collection(idUsuario)
        .doc(periodoSelec).collection('Classes').doc(valueClasse)
        // salvar os dados no doc novo
        await newDocRef.set(data||{});
        // Exclusão do doc antigo
        await oldDocRef.delete();
        
        setRecarregarClasses('recarregar')
        setClasseSelec(valueClasse);
        setModalEditClasse(!modalEditClasse);
      }else{
        ToastAndroid.show(
          'Digite o nome da classe!',
          ToastAndroid.SHORT)
      }

      //atualizando o estado da classe
      firestore().collection(idUsuario).
      doc('Dados').collection('Estados').
      doc('EstadosApp').update({
        classe:valueClasse
      })
      
      
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditClasse}
                onRequestClose={() => {
                  setModalEditClasse(!modalEditClasse);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcon}>
                            <TouchableOpacity  onPress={()=>setModalEditClasse(!modalEditClasse)}>
                                <Icon name="cancel-circle" color="white" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Edite o nome da classe:</Text>
                        <TextInput 
                          style={styles.textInput}
                          placeholder='Nome da classe'
                          defaultValue={classeSelec} 
                          onChange={onChangeInputClasse}>
                        </TextInput>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={()=>[onPressEditClasse(),setRecarregarClasses('recarregarClasses')]}>
                            <Text style={styles.textStyle}>Editar</Text>
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
    containerIcon:{
      alignItems:'flex-end'
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: Globais.corTerciaria,
      borderRadius: 20,
      padding: 35,
      // alignItems: 'center',
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
      backgroundColor: Globais.corPrimaria,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'white',
      fontSize:18,
    },
    textInput:{
      backgroundColor: 'white', 
      minWidth:100, 
      marginBottom:20
    }

  });

export default ModalEditClasse;