import {  View, Button } from "react-native"
import React, { useContext} from "react";
import {Context} from "./data/Provider";
import firestore from '@react-native-firebase/firestore';

//Componente inutilizado

const BtnDelAluno = () =>{

    const {setModalDelAluno, idPeriodoSelec,
        idCasseSelec,numAlunoSelec} = useContext(Context);
    
    const deletar = ()=> {
        firestore().collection('Usuario')
        .doc(idPeriodoSelec).collection('Classes')
        .doc(idCasseSelec).collection('ListaAlunos')
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

