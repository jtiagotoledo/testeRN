import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native"
import {Context} from "./data/Provider";

import ModalCalendario from "./ModalCalendario";
import Globais from "./Globais";
import HeaderFrequencia from "./HeaderFrequencia";
import FlatListFrequencia from "./FlatListFrequencia";
import FlatListClasses from "./FlatListClasses";


const Frequencia = () =>{
    const {setModalCalendario, dataSelec,flagBtnAddData} = useContext(Context);
    let dataAno=''
    let dataMes=''
    let dataDia=''
    let data=''

    if(dataSelec!=''){
        dataAno = dataSelec.slice(0,4);
        dataMes = dataSelec.slice(5,7);
        dataDia = dataSelec.slice(8,10);
        data = dataDia+'/'+dataMes+'/'+dataAno
    }
    

    return(
        <View style={styles.container}>
            <HeaderFrequencia title="Frequência"></HeaderFrequencia>
            <FlatListClasses></FlatListClasses>
            <Button title="Add data" disabled={flagBtnAddData} onPress={()=>setModalCalendario(true)}></Button>
            <View style={styles.containerText}>
                <Text style={styles.text}>{data}</Text>
            </View>
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
    containerText:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:16,
    },
    text:{
        alignContent:'center',
        alignItems:'center',
        fontSize:20,
        padding:5,
        color: Globais.corTextoEscuro,
      },
});

export default Frequencia;