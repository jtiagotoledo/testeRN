import { View, StyleSheet, Modal, TouchableOpacity } from "react-native"
import React, { useContext } from 'react';
import {Context} from "./data/Provider";
import Globais from "./Globais";
import CalendarioFrequencia from "./CalendarioFrequencia";
import { Icon } from "./Icon";

const ModalCalendarioFrequencia = () =>{

    const {modalCalendarioFreq,setModalCalendarioFreq} = useContext(Context)

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCalendarioFreq}
                onRequestClose={() => {
                setModalCalendarioFreq(!modalCalendarioFreq);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcon}>
                            <TouchableOpacity  onPress={()=>setModalCalendarioFreq(!modalCalendarioFreq)}>
                                <Icon name="cancel-circle" color="white" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                        <CalendarioFrequencia></CalendarioFrequencia>
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

export default ModalCalendarioFrequencia;