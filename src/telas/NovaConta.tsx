import React from 'react';
import { TextInput, View, Button, Text, StyleSheet, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';

const NovaConta = ({navigation}:any)=>{

    const criarConta = () =>{
        auth()
            .createUserWithEmailAndPassword('jane.doeexample.com', 'SuperSecretPassword!')
            .then(() => {
                ToastAndroid.show('Conta criada com sucesso',ToastAndroid.SHORT)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    ToastAndroid.show('Este Email já está em uso',ToastAndroid.SHORT)
                }

                if (error.code === 'auth/invalid-email') {
                    ToastAndroid.show('Email inválido',ToastAndroid.SHORT)
                }
            });
    }
    return(
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder='Digite um Email válido'></TextInput>
            <TextInput style={styles.textInput} placeholder='Crie uma senha'></TextInput>
            <Button title='Cria conta' onPress={()=>criarConta()}></Button>
            <View style={styles.containerText}>
                <Text style={styles.text} onPress={()=>navigation.reset({
                    index:0,
                    routes:[{name:"Login"}]
                })}>Já possui uma conta?</Text>
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
  
export default NovaConta;