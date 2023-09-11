import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";
import Globais from './Globais';

type ItemData = {
  nome: string;
  numero: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  // textFreq: string
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <View style={styles.containerItem}>
    <View style={[styles.item, styles.nome]}>
      <Text style={[styles.title]}>{item.numero} {item.nome}</Text>
    </View>
    <TouchableOpacity onPress={onPress} style={[styles.item, styles.frequencia
    ]}>
      <Text style={[styles.titleFrequencia]}></Text>
    </TouchableOpacity>
  </View>
  
);

const FlatListFrequencia = () => {
    const alunos:any[] = []
    const [selectedId, setSelectedId] = useState<string>();
    const [listaAlunos,setListaALunos]=useState([{numero:'',nome:''}]);
    const {periodoSelec,classeSelec,setNumAlunoSelec,dataSelec} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
      await firestore().collection('Usuario')
      .doc(periodoSelec).collection('Classes')
      .doc(classeSelec).collection('Frequencia')
      .doc(dataSelec).collection('Alunos')
      .orderBy('numero')
      .get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
      alunos.push(documentSnapshot.data());
      });
      });
      setListaALunos(alunos)
    }
    data()        
  },[classeSelec,listaAlunos]);

  const onPressItemFreq = (item:any) =>{
    const numAluno = item.numero;
    setSelectedId(item.numero);
    setNumAlunoSelec(item.numero.toString());
    firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .doc(classeSelec).collection('Frequencia')
        .doc(dataSelec).collection('Alunos')
        .doc(numAluno+'').set({
          numero:item.numero,
          nome:item.nome,
          frequencia:'A'
        });
  }

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.numero === selectedId ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.numero === selectedId ? Globais.corTextoClaro : Globais.corTextoEscuro;
    // const textFreq = item.numero === selectedId ? 'A': 'P';

    return (
      <Item
        item={item}
        onPress={() => onPressItemFreq(item)}
        backgroundColor={backgroundColor}
        textColor={color}
        // textFreq={textFreq}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listaAlunos}
        renderItem={renderItem}
        keyExtractor={item => item.numero}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  containerItem:{
    flexDirection:'row',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: Globais.corTerciaria,
  },
  title: {
    fontSize: 24,
  },
  titleFrequencia:{
    fontSize: 24,
    textAlign: 'center',
  },
  nome:{
    flex:3
  },
  frequencia:{
    flex:1
  }
});

export default FlatListFrequencia;