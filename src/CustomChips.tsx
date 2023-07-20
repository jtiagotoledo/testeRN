import { View,Text, Button } from 'react-native';
import { Chip } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';



const CustomChips = ()=>{
    //const numbers = [1, 2, 3, 4, 5];
    let chipsClasses;
    const  listaClasses:any=[];

    const [value,setValue] = useState('')

    useEffect(()=>{

        firestore().collection('Users').get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
            listaClasses.push(documentSnapshot.id);
                  
            });
            console.log('listaClasses:',listaClasses);
                  
        });
                
    },[listaClasses])
    
    /* console.log('CustomChips',props.title);
    chipsClasses = props.title.map((classe:any) =>
    <Chip key={classe} title={classe}></Chip>
    );
    console.log('chipsClasses',chipsClasses); */
    
    const alterarLista = () =>{
        setValue(listaClasses)
    }

    
    return(
        <View>
        <Chip  key={value} title={value}></Chip>
        <Button onPress={alterarLista} title='alterarLista'/>
        </View>
    );
}


export default CustomChips;