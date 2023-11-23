import { Text, View, StyleSheet, Pressable, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid, TouchableOpacity } from "react-native"
import React, { useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from "../data/Globais";
import {Icon} from '../componentes/Icon'

const ModalMenu = () =>{

    const {modalMenu,setModalMenu} = useContext(Context)

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMenu}
                onRequestClose={() => {
                setModalMenu(!setModalMenu);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      height:100,
      justifyContent: 'center',
      // alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      backgroundColor: Globais.corTerciaria,
      borderRadius: 20,
      padding: 35,
      height:'100%',
      width:'80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
      fontSize:18
    },
  });

export default ModalMenu