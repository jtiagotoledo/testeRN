import React from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';


const Login = ({navigation}:any)=>{
    return(
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder='Email'></TextInput>
            <TextInput style={styles.textInput} placeholder='Senha'></TextInput>
            <Button title='Entrar' onPress={()=>navigation.reset({
                index:0,
                routes:[{name:"App"}]
            })}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginLeft:24,
        marginRight:24,
    },
    textInput:{
        backgroundColor:'#c0c0c0',
        marginBottom:8
    }
});
  
export default Login;