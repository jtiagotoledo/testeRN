import React, { useContext, useEffect, useState } from 'react'
import {View, FlatList, Text, StyleSheet, StatusBar} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
];


type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
);

const FlatListClasses = () => {
  const alunos:any[] = []
  const [listaAlunos,setListaALunos]=useState([{numero:'',nome:''}]);
  const {periodoSelec,classeSelec} = useContext(Context)


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

    return(
        <View>
            <FlatList
            data={listaAlunos}
            renderItem={({item}) => 
            <Item title={item.nome} />}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

export default FlatListClasses;  