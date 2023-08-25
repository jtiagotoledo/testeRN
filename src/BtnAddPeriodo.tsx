import { Pressable, View, Text, StyleSheet } from "react-native"
import React, {useState, useContext} from "react";
import DataContext from "./data/DataContext";

const BtnAddPeriodo = ({ativarModal}:any) =>{

    const context = useContext(DataContext)
    const [texto,setTexto]=useState(context.text)

    return(
        <View>
            <Text>{texto}</Text>
        {<Pressable
            style={style.button}
            onPress={()=>{setTexto('novo')}}>
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

