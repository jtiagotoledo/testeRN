import {  View, Button } from "react-native"
import React, { useContext} from "react";
import {Context} from "./data/Provider";

// Componente inutilizado

const BtnAddAluno = () =>{

    const {setModalAluno} = useContext(Context);
    

    return(
        <View>
            <Button
            title='Add Aluno'
            onPress={()=>setModalAluno(true)}></Button>
        </View>
    )
}

export default BtnAddAluno;

