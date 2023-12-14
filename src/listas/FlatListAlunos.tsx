import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, View} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from '../data/Globais';

type ItemData = {
  nome: string;
  numero: string;
  inativo: string
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  onLongPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, onLongPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.numero} {item.nome}</Text>
  </TouchableOpacity>
);

const FlatListAlunos = () => {
    const alunos:any[] = []
    const {flagLoadAlunos,setflagLoadAlunos,idPeriodoSelec,idClasseSelec,
      setNumAlunoSelec,setRecarregarAlunos,recarregarAlunos,setFlagLongPressClasse,
      listaAlunos,setListaAlunos,idUsuario,setFlagLongPressAluno,
      selectedIdAluno, setSelectedIdAluno,setNomeAlunoSelec,alunoInativo,setAlunoInativo} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
      setListaAlunos([{nome:'',numero:''}]);
      setRecarregarAlunos('');
      setflagLoadAlunos('carregando');
      firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .doc(idClasseSelec).collection('ListaAlunos')
      .orderBy('numero')
      .onSnapshot((snapshot)=>{
      if(snapshot.empty  && idClasseSelec!=''){
        setflagLoadAlunos('vazio');
        console.log('alunos empty',idClasseSelec)
      }else{
        snapshot.forEach((documentSnapshot,index) => {
        alunos.push(documentSnapshot.data());
        if(snapshot.size-index==1){
          setflagLoadAlunos('carregado');
          console.log('entrou no if da flag alunos',idClasseSelec)
        }
        });
    }
    });
    setListaAlunos(alunos)
  }
  data()        
  },[idPeriodoSelec,idClasseSelec,recarregarAlunos]);

  const onPressItem = (item:any) =>{
    setSelectedIdAluno(item.numero)
    setNumAlunoSelec(item.numero.toString())
    setNomeAlunoSelec(item.nome)
    setFlagLongPressAluno(false)
  }

  const onLongPressItem = (item:any) =>{
    setSelectedIdAluno(item.numero)
    setNumAlunoSelec(item.numero.toString())
    setAlunoInativo(item.inativo)
    setFlagLongPressAluno(true)
    setFlagLongPressClasse(false)
  }

  const renderItem = ({item}: {item: ItemData}) => {
    let backgroundColor = ''
    if(item.inativo){
      backgroundColor = Globais.corAlunoInativo
    }else{
      backgroundColor = item.numero === selectedIdAluno ? Globais.corPrimaria : Globais.corTerciaria;
    }
    const color = item.numero === selectedIdAluno ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => onPressItem(item)}
        onLongPress={() => onLongPressItem(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderCarregamento = () =>{
    if(idClasseSelec!=''){
        switch(flagLoadAlunos){
          case 'vazio':
            return(
              <View>
                  <Text style={styles.textLoad}>Adicione os alunos...</Text>
              </View>
            )
          case 'carregando':
            return(
              <View>
                  <Text style={styles.textLoad}>Carregando...</Text>
              </View>
            )   
          case 'carregado':
            return(
              <FlatList
                data={listaAlunos}
                renderItem={renderItem}
                keyExtractor={item => item.numero}
                extraData={selectedIdAluno}
              />
            )
        }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        {renderCarregamento()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:5,
  },
  title: {
    fontSize: 24,
  },
  textLoad:{
    fontSize:24,
    color:Globais.corTextoClaro,
  }
});

export default FlatListAlunos;