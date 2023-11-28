import { Text, View, StyleSheet, Button, Modal, TouchableWithoutFeedback } from "react-native"
import React, { useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Context} from "../data/Provider";
import Globais from "../data/Globais";
import {Icon} from '../componentes/Icon'

const ModalMenu = ({navigation}:any) =>{

    const {modalMenu,setModalMenu} = useContext(Context)

    const funcSair = () =>{
      auth().signOut()
        .then(()=>[
          console.log('usuário saiu'),
          navigation.reset({index:0,routes:[{name:"Login"}]})
        ])
    }

    return(
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={modalMenu}
                onRequestClose={() => {
                setModalMenu(!modalMenu);
                }}>
                <TouchableWithoutFeedback onPress={() => {setModalMenu(!modalMenu)}}>
                  <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.textStyle}>{auth().currentUser?.email}</Text>
                  <Button title='SAIR' onPress={funcSair}></Button>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalView: {
    backgroundColor: Globais.corTerciaria,
    padding: 35,
    position:'absolute',
    top:0,
    height:'100%',
    width:'70%',
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