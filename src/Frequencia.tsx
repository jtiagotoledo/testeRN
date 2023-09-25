import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native"
import {Context} from "./data/Provider";

import ModalCalendario from "./ModalCalendario";
import Globais from "./Globais";
import HeaderFrequencia from "./HeaderFrequencia";
import FlatListFrequencia from "./FlatListFrequencia";
import FlatListClasses from "./FlatListClasses";


const Frequencia = () =>{
    const {setModalCalendario, dataSelec} = useContext(Context);

    return(
        <View style={styles.container}>
            <HeaderFrequencia title="Frequência"></HeaderFrequencia>
            <FlatListClasses></FlatListClasses>
            <Button title="Add data" onPress={()=>setModalCalendario(true)}></Button>
            <Text style={styles.text}>{dataSelec}</Text>
            <FlatListFrequencia></FlatListFrequencia>
            <ModalCalendario></ModalCalendario>
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

export default Frequencia;