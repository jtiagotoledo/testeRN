import { FloatingAction } from "react-native-floating-action";
import React, { useContext } from 'react';
import { View } from "react-native";
import {Icon} from './Icon'
import {Context} from "./data/Provider";
import Globais from "./Globais";

const actions = [
    {
      text: "Adicionar período",
      icon: <Icon name={'calendar'} color={'white'}></Icon>,
      name: "periodo",
      position: 1
    },
    {
      text: "Adicionar classe",
      icon: <Icon name={'book'} color={'white'}></Icon>,
      name: "classe",
      position: 2,
    },
    {
      text: "Adicionar aluno",
      icon: <Icon name={'user'} color={'white'}></Icon>,
      name: "aluno",
      position: 3
    },
    
  ];

const Fab = ()=>{

    const {setModalPeriodo, setModalClasse,setModalAluno} = useContext(Context);

    return(
        <View>
            <FloatingAction
            color={Globais.corPrimaria}
            actions={actions}
            onPressItem={name => {
                name=='periodo'?setModalPeriodo(true):null
                name=='classe'?setModalClasse(true):null
                name=='aluno'?setModalAluno(true):null
            }}/>
        </View>
    )
}

export default Fab