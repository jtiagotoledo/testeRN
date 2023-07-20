import { View,Text, Button } from 'react-native';
import { Chip } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';

const CustomChips = ()=>{
    //const numbers = [1, 2, 3, 4, 5];
    let chipsClasses:any='';
    const  listaClasses:any=[''];

    const [value,setValue] = useState('')

    useEffect(()=>{
         
        firestore().collection('Users').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        listaClasses.push(documentSnapshot.id);
        chipsClasses = listaClasses.map((classe:any) =>
        <Chip key={classe} title={classe}></Chip>);
        });
        
    
        console.log('chipsClasses',chipsClasses);    
        console.log('listaClasses',listaClasses);    
        });
               
    },[chipsClasses])
  
    
    
    const alterarLista = () =>{
        setValue(chipsClasses)
    }

    
    return(
        <View>
            <View>{value}</View>
            <Button onPress={alterarLista} title='alterarLista'/>
        </View>
        
    );
}


export default CustomChips;