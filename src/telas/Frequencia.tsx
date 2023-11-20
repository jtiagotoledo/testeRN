import React, { useContext, useEffect } from "react";
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

const Frequencia = () =>{
    const {dataSelec,setModalCalendarioFreq,classeSelec,
        flagLoadAlunos,periodoSelec,valueAtividade,setValueAtividade} = useContext(Context);
    
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

    const onChangeInputAtividades = (text:String) =>{
        firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .doc(classeSelec).collection('Atividades')
        .doc(dataSelec).set({atividade:text})
        setValueAtividade({atividade:text})
    }

    useEffect(()=>{
        const data = async ()=>{
            //Recuperar atividades da data selecionada no BD.
            const textoAtividade =  firestore().collection('Usuario')
            .doc(periodoSelec).collection('Classes')
            .doc(classeSelec).collection('Atividades')
            .doc(dataSelec).get().then()
            setValueAtividade((await textoAtividade).data()||'')
            console.log('valueAtividade',(await textoAtividade).data())
        }
    data()        
    },[dataSelec]);

    const renderData = () =>{
        if(data==''){
            return(
                <TouchableOpacity onPress={()=>{
                        if(classeSelec!='' && flagLoadAlunos!='vazio'){
                            setModalCalendarioFreq(true)
                        }else if(classeSelec==''){
                            ToastAndroid.show('Selecione uma classe primeiro...',ToastAndroid.SHORT)
                        }
                        if(flagLoadAlunos=='vazio'){
                            ToastAndroid.show('Primeiro, adicione os alunos nessa classe...',ToastAndroid.SHORT)
                        }
                    }
                }>    
                    <Icon name="plus" color="black" size={20}/>
                </TouchableOpacity>
            )
        }else{
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