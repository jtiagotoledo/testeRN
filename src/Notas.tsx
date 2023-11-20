import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View , TextInput, ToastAndroid, NativeSyntheticEvent, TextInputChangeEventData} from "react-native"
import {Context} from "./data/Provider";
import { Divider } from "react-native-paper";

import ModalCalendarioNota from "./ModalCalendarioNota";
import Globais from "./Globais";
import FlatListClasses from "./FlatListClasses";
import {Icon} from './Icon'
import firestore from '@react-native-firebase/firestore';
import HeaderNotas from "./HeaderNotas";
import FlatListNotas from "./FlatListNotas";

const Notas = () =>{
    const {dataSelec,setModalCalendarioNota,classeSelec,
        flagLoadAlunos,periodoSelec,valueAtividade} = useContext(Context);
    
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
        firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .doc(classeSelec).collection('Frequencia')
        .doc(dataSelec).set({atividade:event.nativeEvent.text})
    }

    const renderData = () =>{
        if(data==''){
            return(
                <TouchableOpacity onPress={()=>{
                        if(classeSelec!='' && flagLoadAlunos!='vazio'){
                            setModalCalendarioNota(true)
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