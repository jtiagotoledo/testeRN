import { Pressable, View, Text, StyleSheet } from "react-native"
import React, { useContext} from "react";
import {Context} from "./data/Provider";

const BtnAddClasse = () =>{

    const {modalClasse,setModalClasse} = useContext(Context);
    
    return(
        <View>
            <Text>{modalClasse}</Text>
            <Pressable
                style={style.button}
                onPress={()=>setModalClasse(true)}>
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

