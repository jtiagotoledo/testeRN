import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Chip } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import {Context} from "./data/Provider";


const CustomChips = ()=>{
    let listaChipsClasses:any='';
    const  listaClasses: any[]=[];
    const [chipsClasses,setChipsClasses] = useState('')
    const {periodoSelec} = useContext(Context)

    useEffect(()=>{
        const data = async ()=>{
        await firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        listaClasses.push(documentSnapshot.id);
        listaChipsClasses = listaClasses.map((classe:any) =>
        <Chip key={classe} title={classe} 
        containerStyle={{marginHorizontal:10, marginTop:20, marginBottom:100}}></Chip>);
        });
        setChipsClasses(listaChipsClasses)
        });
    }
    data()        
    },[periodoSelec,chipsClasses]);

    return(
        <View style={styles.contentView}>
            <Text>{periodoSelec}</Text>
            <ScrollView horizontal={true}>
            <View style={{alignItems:'center', flexDirection: 'row'}}>{chipsClasses}</View>
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