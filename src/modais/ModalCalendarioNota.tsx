import { View, StyleSheet, Modal, TouchableOpacity } from "react-native"
import React, { useContext } from 'react';
import {Context} from "../data/Provider";
import Globais from "../data/Globais";
import CalendarioNota from "../componentes/CalendarioNota";
import { Icon } from "../componentes/Icon";

const ModalCalendarioNota = () =>{

    const {modalCalendarioNota,setModalCalendarioNota} = useContext(Context)

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCalendarioNota}
                onRequestClose={() => {
                setModalCalendarioNota(!modalCalendarioNota);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcon}>
                            <TouchableOpacity  onPress={()=>setModalCalendarioNota(!modalCalendarioNota)}>
                                <Icon name="cancel-circle" color="white" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                        <CalendarioNota></CalendarioNota>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    containerIcon:{
      alignItems:'flex-end',
      marginBottom:32,
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
    }
  });

export default ModalCalendarioNota;