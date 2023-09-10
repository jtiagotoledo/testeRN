import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native"
import {Context} from "./data/Provider";

import ModalCalendario from "./ModalCalendario";
import Globais from "./Globais";
import HeaderFrequencia from "./HeaderFrequencia";


const Frequencia = () =>{
    const {setModalCalendario} = useContext(Context);

    return(
        <View style={styles.container}>
            <HeaderFrequencia title="Frequência"></HeaderFrequencia>
            <Text>Frequencia</Text>
            <Button title="Add data" onPress={()=>setModalCalendario(true)}></Button>
            <ModalCalendario></ModalCalendario>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: Globais.corSecundaria,
      flex:1,
    },
});

export default Frequencia;