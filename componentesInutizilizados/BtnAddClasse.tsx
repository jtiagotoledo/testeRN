import { Pressable, View, Text, StyleSheet, ToastAndroid } from "react-native"
import React, { useContext} from "react";
import {Context} from "./data/Provider";

// Componente inutilizado

const BtnAddClasse = () =>{

    const {setModalClasse, idPeriodoSelec} = useContext(Context);
    
    const showToast = () =>{
        ToastAndroid.show('Selecione primeiro o período',2000)
      }

    return(
        <View>
            <Pressable
                style={style.button}
                onPress={()=>idPeriodoSelec!=''?setModalClasse(true):showToast()}>
                <Text>+</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#F194FF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginEnd:8,
    minWidth:40,
    marginLeft:16,
    marginRight:16
    
},
})
export default BtnAddClasse

