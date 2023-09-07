import { View, ScrollView, StyleSheet } from 'react-native';
import { Chip } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import {Context} from "./data/Provider";
import Globais from './Globais';


const CustomChips = ()=>{
    let listaChipsClasses:any='';
    const  listaClasses: any[]=[];
    const [chipsClasses,setChipsClasses] = useState('')
    const {periodoSelec,setClasseSelec} = useContext(Context)

    useEffect(()=>{
        const data = async ()=>{
        await firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        listaClasses.push(documentSnapshot.id);
        listaChipsClasses = listaClasses.map((classe:any) =>
        <Chip 
        color={Globais.corPrimaria}
        key={classe} title={classe} 
        onPress={()=>{setClasseSelec(classe)}}
        containerStyle={{marginHorizontal:10, marginBottom:20}}>
        </Chip>);
        });
        setChipsClasses(listaChipsClasses)
        });
    }
    data()        
    },[periodoSelec,chipsClasses]);

    return(
        <View >
            <ScrollView horizontal={true}>
                <View 
                    style={styles.contentView}>
                    {chipsClasses}
                </View>
            </ScrollView>
        </View> 
    );
}

const styles = StyleSheet.create({
    contentView: {
      flexDirection:'row',
      marginTop:20,
      minHeight:60,
    },
});

export default CustomChips;