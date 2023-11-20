import { FloatingAction } from "react-native-floating-action";
import React, { useContext } from 'react';
import { View } from "react-native";
import {Context} from "../src/data/Provider";
import Globais from "../src/data/Globais";

const FabFrequencia = ()=>{

    const {setModalCalendario} = useContext(Context);

    return(
        <View>
            <FloatingAction
            color={Globais.corPrimaria}
            onPressMain={()=>setModalCalendario(true)}
            />
        </View>
    )
}

export default FabFrequencia;