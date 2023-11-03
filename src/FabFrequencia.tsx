import { FloatingAction } from "react-native-floating-action";
import React, { useContext } from 'react';
import { View } from "react-native";
import {Icon} from './Icon'
import {Context} from "./data/Provider";
import Globais from "./Globais";

const FabFrequencia = ()=>{

    const {setModalCalendario} = useContext(Context);

    return(
        <View>
            <FloatingAction
            color={Globais.corPrimaria}
            onOpen={()=>null}
            onPressMain={()=>setModalCalendario(true)}
            />
        </View>
    )
}

export default FabFrequencia;