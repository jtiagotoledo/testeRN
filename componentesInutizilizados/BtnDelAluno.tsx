import {  View, Button } from "react-native"
import React, { useContext} from "react";
import {Context} from "./data/Provider";
import firestore from '@react-native-firebase/firestore';

//Componente inutilizado

const BtnDelAluno = () =>{

    const {setModalDelAluno, periodoSelec,
        classeSelec,numAlunoSelec} = useContext(Context);
    
    const deletar = ()=> {
        firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .doc(classeSelec).collection('ListaAlunos')
        .doc(numAlunoSelec).delete()
      }

    return(
        <View>
            <Button
            title='Deletar Aluno'
            onPress={()=>setModalDelAluno(true)}></Button>
        </View>
    )
}

export default BtnDelAluno;

