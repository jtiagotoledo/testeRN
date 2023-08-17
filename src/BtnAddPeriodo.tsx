import { Pressable, View, Text, StyleSheet } from "react-native"
import React, {useState} from "react";

const BtnAddPeriodo = ({ativarModal}:any) =>{

    const [texto,setTexto]=useState('')

    return(
        <View>
        {<Pressable
            style={style.button}
            onPress={ativarModal}>
            <Text>Add</Text>
        </Pressable>}
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
},
})
export default BtnAddPeriodo

