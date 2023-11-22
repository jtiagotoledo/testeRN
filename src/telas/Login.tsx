import React, { useContext } from 'react';
import { TextInput, View, Button, Text, StyleSheet, ToastAndroid, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import auth from '@react-native-firebase/auth';
import {Context} from "../data/Provider";

const Login = ({navigation}:any)=>{
    const {email,setEmail,senha,setSenha} = useContext(Context);

    const entrarConta = () =>{
        auth()
            .signInWithEmailAndPassword(email,senha)
            .then(() => {
                navigation.reset({index:0,routes:[{name:"App"}]})
            })
            .catch(error => {
                console.log('erro',error)
                if (error.code === 'auth/invalid-login') {
                    ToastAndroid.show('Este e-mail não está cadastrado ou senha incorreta',ToastAndroid.SHORT)
                }
            });
    }

    const onChangeInputEmail = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setEmail(event.nativeEvent.text);
        console.log('email',email);
    }

    const onChangeInputSenha = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setSenha(event.nativeEvent.text);
        console.log('senha',senha);
    }
    return(
        <View style={styles.container}>
            <TextInput style={styles.textInput} 
            onChange={onChangeInputEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Email'></TextInput>
            <TextInput style={styles.textInput}
            onChange={onChangeInputSenha} 
            autoCapitalize='none'
            secureTextEntry={true}
            autoCorrect={false}
            placeholder='Senha'></TextInput>
            <Button title='Entrar' onPress={entrarConta}></Button>
            <View style={styles.containerText}>
                <Text style={styles.text} onPress={()=>navigation.reset({
                    index:0,
                    routes:[{name:"NovaConta"}]
                })}>Criar uma conta</Text>
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