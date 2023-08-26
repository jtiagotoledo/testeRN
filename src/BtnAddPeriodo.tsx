import { Pressable, View, Text, StyleSheet } from "react-native"
import React, {useState, useContext} from "react";
import {Context} from "./data/Provider";

const BtnAddPeriodo = () =>{

    const {modalPeriodo,setmodalPeriodo} = useContext(Context)
    
    return(
        <View>
            <Text>{modalPeriodo}</Text>
            <Pressable
                style={style.button}
                onPress={()=>setmodalPeriodo(true)}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd:8,
    minWidth:40
},
})
export default BtnAddPeriodo

