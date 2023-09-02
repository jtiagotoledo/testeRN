import { FloatingAction } from "react-native-floating-action";
import React, { useContext } from 'react';
import { View } from "react-native";
import {Icon} from './Icon'
import {Context} from "./data/Provider";

const actions = [
    {
      text: "Adicionar período",
      icon: <Icon name={'calendar'}></Icon>,
      name: "periodo",
      position: 1
    },
    {
      text: "Adicionar classe",
      icon: <Icon name={'book'}></Icon>,
      name: "classe",
      position: 2,
    },
    {
      text: "Adicionar aluno",
      icon: <Icon name={'user'}></Icon>,
      name: "aluno",
      position: 3
    },
    
  ];

const Fab = ()=>{

    const {setModalPeriodo, setModalClasse,
        setModalAluno} = useContext(Context);

    return(
        <View>
            <FloatingAction
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