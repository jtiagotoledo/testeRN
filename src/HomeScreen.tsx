import { Text, View, Button, TextInput, NativeSyntheticEvent,TextInputChangeEventData } from "react-native"
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';

function HomeScreen({navigation}: {navigation: any}) {
    
    let valor = ''
    const [value,setValue] = useState<string>('')

    const handleOnChangeInput = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setValue(event.nativeEvent.text)
        valor = event.nativeEvent.text
        console.log(valor)
    }

    
    const onPressAdd = () =>{
        const usersCollection = firestore()
        .collection('Users')
        .doc(value)
        .set({
        });
        console.log('entrou na função');
        console.log(value);
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <Text>Olá!32</Text>
        <TextInput onChange={handleOnChangeInput}></TextInput>
        <Button onPress={onPressAdd} title='ADD'/>
      </View>
    );
}

export default HomeScreen;