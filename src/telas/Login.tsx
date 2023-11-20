import React from 'react';
import { TextInput, View, Button, Text, StyleSheet } from 'react-native';


const Login = ({navigation}:any)=>{
    return(
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder='Email'></TextInput>
            <TextInput style={styles.textInput} placeholder='Senha'></TextInput>
            <Button title='Entrar' onPress={()=>navigation.reset({
                index:0,
                routes:[{name:"App"}]
            })}></Button>
            <View style={styles.containerText}>
                <Text style={styles.text} onPress={()=>navigation.reset({
                    index:0,
                    routes:[{name:"NovaConta"}]
                })}>Criar conta</Text>
            </View>
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
    containerText:{
        alignItems:'center'
    },
    textInput:{
        backgroundColor:'#c0c0c0',
        marginBottom:8
    },
    text:{
        color:'blue',
        alignContent:'center',
        alignItems:'center',
        marginTop:16
    }
});
  
export default Login;