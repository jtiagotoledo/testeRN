import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";
import Globais from './Globais';

type ItemData = {
  classe: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.classe}</Text>
  </TouchableOpacity>
);

const FlatListClasses = () => {
    let classes:any []= []
    const [selectedId, setSelectedId] = useState<string>();
    const [listaClasses,setListaClasses]=useState([{classe:''}]);
    const {periodoSelec,classeSelec,setClasseSelec} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
    await firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
    classes.push(documentSnapshot.data());
    });
    });
    setListaClasses(classes)
}
data()        
},[periodoSelec,listaClasses]);

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.classe === selectedId ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.classe === selectedId ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => [setSelectedId(item.classe),setClasseSelec(item.classe), console.log(classeSelec)]}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView >
      <FlatList
        horizontal = {true}
        data={listaClasses}
        renderItem={renderItem}
        keyExtractor={item => item.classe}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius:40
  },
  title: {
    fontSize: 20,

  },
});

export default FlatListClasses;