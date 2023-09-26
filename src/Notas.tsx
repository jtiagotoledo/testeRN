import React from "react";
import { StyleSheet, Text, View, Button } from "react-native"
import Globais from "./Globais";
import HeaderNotas from "./HeaderNotas";
import FlatListClasses from "./FlatListClasses";

const Notas = () =>{
    return(
        <View style={styles.container}>
            <HeaderNotas title="Notas"></HeaderNotas>
            <FlatListClasses></FlatListClasses>
            <Button title='add NOTAS'></Button>
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

export default Notas;