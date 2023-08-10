import { View, ScrollView, StyleSheet, Button, Text } from 'react-native';
import { Chip } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import Globais from './Globais'

const CustomChips = ()=>{
    let chipsClasses:any='';
    const  listaClasses: any[]=[];

    

    const [value,setValue] = useState('')
    const [valueGlobal,setValueGlobal] = useState(Globais.periodSelec)

    useEffect(()=>{
        const data = async ()=>{
        await firestore().collection('Usuario').doc(Globais.periodSelec).collection('Classes').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        listaClasses.push(documentSnapshot.id);
        chipsClasses = listaClasses.map((classe:any) =>
        <Chip key={classe} title={classe} containerStyle={{marginHorizontal:10, marginTop:20, marginBottom:100}}></Chip>);
        });
        
        setValue(chipsClasses)
        //console.log('chipsClasses',chipsClasses);    
        //console.log('listaClasses',listaClasses);    
        });
    }
    data()        
    },[Globais.periodSelec,value]);

    const mudar = ()=>{
        setValueGlobal(Globais.periodSelec)
    }

    
    return(
        <View style={styles.contentView}>
            
            <Text>{Globais.periodSelec}</Text>
            <ScrollView horizontal={true}>
            <View style={{alignItems:'center', flexDirection: 'row'}}  >{value}</View>
            </ScrollView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    contentView: {
      marginTop: 20,
      flexDirection:'row'
    },
    });


export default CustomChips;