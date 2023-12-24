import React, { useCallback, useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View , TextInput, ToastAndroid} from "react-native"
import {Context} from "../data/Provider";
import { Divider } from "react-native-paper";

import ModalCalendarioFrequencia from "../modais/ModalCalendarioFrequencia";
import Globais from "../data/Globais";
import HeaderFrequencia from "../componentes/HeaderFrequencia";
import FlatListFrequencia from "../listas/FlatListFrequencia";
import FlatListClasses from "../listas/FlatListClasses";
import {Icon} from '../componentes/Icon'
import firestore from '@react-native-firebase/firestore';
import FabFrequencia from "../componentes/FabFrequencia";
import { useFocusEffect } from "@react-navigation/native";

const Frequencia = () =>{
    const {dataSelec,setModalCalendarioFreq,idClasseSelec,
        idPeriodoSelec,valueAtividade,setValueAtividade,
        idUsuario,setIdPeriodoSelec,setDataSelec,setIdClasseSelec} = useContext(Context);
    
    let dataAno='',dataMes='',dataDia='',data=''

    if(dataSelec!=''){
        dataAno = dataSelec.slice(0,4);
        dataMes = dataSelec.slice(5,7);
        dataDia = dataSelec.slice(8,10);
        data = dataDia+'/'+dataMes+'/'+dataAno
    }

    const onChangeInputAtividades = (text:String) =>{
        firestore().collection(idUsuario)
        .doc(idPeriodoSelec).collection('Classes')
        .doc(idClasseSelec).collection('Frequencia')
        .doc(dataSelec).set({atividade:text})
        setValueAtividade({atividade:text})
    }

    useEffect(()=>{
        //recuperar dados dos estados do app
        firestore().collection(idUsuario)
        .doc('EstadosApp').onSnapshot(snapShot=>{
          setIdPeriodoSelec(snapShot.data()?.idPeriodo)
          setIdClasseSelec(snapShot.data()?.idClasse)
          setDataSelec(snapShot.data()?.data)
        })
      },[])

    useEffect(()=>{
        const data = async ()=>{
            //Recuperar atividades da data selecionada no BD.
            const textoAtividade =  firestore().collection(idUsuario)
            .doc(idPeriodoSelec).collection('Classes')
            .doc(idClasseSelec).collection('Frequencia')
            .doc(dataSelec).get().then()
            setValueAtividade((await textoAtividade).data()||'')
            console.log('valueAtividade',(await textoAtividade).data())
        }
    data()        
    },[dataSelec]);

    const renderData = () =>{
        if(data!=''){
            return(
                <TouchableOpacity onPress={()=>setModalCalendarioFreq(true)}>
                    <Text style={styles.text}>{data}</Text>
                </TouchableOpacity>  
            )
        }
    }

    return(
        <View style={styles.container}>
            <HeaderFrequencia title="Frequência"></HeaderFrequencia>
            <FlatListClasses></FlatListClasses>
            <Divider style={styles.divider}></Divider>
            <View style={styles.containerText}>
                {renderData()}
            </View>
            <Divider style={styles.divider}></Divider>
            <View style={styles.containerInput}>
                {dataSelec!=''?
                <TextInput 
                multiline
                placeholder="Descreva as atividades realizadas..." 
                onChangeText={onChangeInputAtividades}
                value={valueAtividade.atividade}
                style={styles.textInput}></TextInput>:null}
            </View>
            <FlatListFrequencia></FlatListFrequencia>
            <ModalCalendarioFrequencia></ModalCalendarioFrequencia>
            <FabFrequencia></FabFrequencia>
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

export default Frequencia;