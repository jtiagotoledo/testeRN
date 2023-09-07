import React, { useContext, useEffect, useState } from 'react'
import {View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";
import Globais from './Globais';

const FlatListClasses = () => {
  const alunos:any[] = []
  const [listaAlunos,setListaALunos]=useState([{numero:'',nome:''}]);
  const {periodoSelec,classeSelec,setNumAlunoSelec} = useContext(Context)


  useEffect(()=>{
    const data = async ()=>{
    await firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('ListaAlunos')
    .get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
    alunos.push(documentSnapshot.data());
    });
    });
    setListaALunos(alunos)
}
data()        
},[periodoSelec,listaAlunos]);

type ItemProps = {nome: string, numero:string};

const Item = ({nome,numero}: ItemProps) => (
    <View style={styles.item}>
      <TouchableOpacity
      onLongPress={()=>setNumAlunoSelec(numero)}>
        <Text 
        style={styles.title}>
          {numero} {nome}
        </Text>
      </TouchableOpacity>
    </View>
);

    return(
        <View style={styles.container}>
            <FlatList
            data={listaAlunos}
            renderItem={({item}) => 
            <Item nome={item.nome} numero={item.numero}/>}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow:1,
      flex:1,
      backgroundColor: Globais.corSecundaria,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
      color: Globais.corTexto
    },
  });

export default FlatListClasses;  