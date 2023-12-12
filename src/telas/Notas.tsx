import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View , TextInput, ToastAndroid, NativeSyntheticEvent, TextInputChangeEventData} from "react-native"
import {Context} from "../data/Provider";
import { Divider } from "react-native-paper";

import ModalCalendarioNota from "../modais/ModalCalendarioNota";
import Globais from "../data/Globais";
import FlatListClasses from "../listas/FlatListClasses";
import firestore from '@react-native-firebase/firestore';
import HeaderNotas from "../componentes/HeaderNotas";
import FlatListNotas from "../listas/FlatListNotas";
import FabNotas from "../componentes/FabNotas";

const Notas = () =>{
    const {dataSelec,setModalCalendarioNota,idCasseSelec,
        flagLoadAlunos,idPeriodoSelec,idUsuario} = useContext(Context);
    
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

    const onChangeInputAtividades = (event: NativeSyntheticEvent<TextInputChangeEventData>) =>{
        firestore().collection(idUsuario)
        .doc(idPeriodoSelec).collection('Classes')
        .doc(idCasseSelec).collection('Frequencia')
        .doc(dataSelec).set({atividade:event.nativeEvent.text})
    }

    const renderData = () =>{
        if(data!=''){
            return(
                <TouchableOpacity onPress={()=>setModalCalendarioNota(true)}>
                    <Text style={styles.text}>{data}</Text>
                </TouchableOpacity>  
            )
            }
    }
    
    return(
        <View style={styles.container}>
            <HeaderNotas title="Frequência"></HeaderNotas>
            <FlatListClasses></FlatListClasses>
            <Divider style={styles.divider}></Divider>
            <View style={styles.containerText}>
                {renderData()}
            </View>
            <Divider style={styles.divider}></Divider>
            <FlatListNotas></FlatListNotas>
            <ModalCalendarioNota></ModalCalendarioNota>
            <FabNotas></FabNotas>
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
        marginBottom:16,
    },
    text:{
        alignContent:'center',
        alignItems:'center',
        fontSize:20,
        padding:5,
        color: Globais.corTextoEscuro,
      },
    divider:{
        backgroundColor: Globais.corPrimaria,
    },
    textInput:{
        width:'90%',
        backgroundColor:Globais.corTextoClaro
    },
    containerInput:{
        marginTop:16,
        
        flexDirection:'row',
        justifyContent:'center',
    }
});

export default Notas;