import { Pressable, View, Text, StyleSheet } from "react-native"
import React, {useState} from "react";



const BtnAddPeriodo = () =>{

    const [texto,setTexto]=useState('')

    const mudarTexto = () =>{
        setTexto('mudou')
    }

    return(
        <View>
        <Pressable
            style={style.button}
            onPress={mudarTexto}>
            {/* onPress={() => setModalVisible(true)}> */}
            <Text>Add</Text>
        </Pressable>
        <Text>...{texto}</Text>
        </View>
    )
}

const style = StyleSheet.create({
button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#F194FF'
  

},
})
export default BtnAddPeriodo

