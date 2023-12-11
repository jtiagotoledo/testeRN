import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from '../data/Globais';

type ItemData = {
  classe: string;
  idClasse: string;
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
    <Text style={[styles.title, {color: textColor}]}>{item.classe}</Text>
  </TouchableOpacity>
);

const FlatListClasses = () => {
    let classes:any []= []
    const {idPeriodoSelec,classeSelec,setClasseSelec,recarregarClasses} = useContext(Context)
    const {flagLoadClasses,setflagLoadAlunos,setflagLoadClasses,
      setFlagLoadFrequencia,listaClasses,setListaClasses,
      setRecarregarClasses,idUsuario,setFlagLongPressClasse,
      setSelectedIdAluno,setNumAlunoSelec,setFlagLongPressAluno,nomePeriodoSelec} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
      setListaClasses('');
      setRecarregarClasses('');
      setflagLoadClasses('carregando');
      firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .orderBy('classe')
      .onSnapshot(snapshot => {
        if(snapshot.empty && idPeriodoSelec!=''){
          setflagLoadClasses('vazio');
          console.log('classe empty',idPeriodoSelec)
        }else{
          snapshot.forEach((documentSnapshot,index) => {
          classes.push(documentSnapshot.data());
            if(snapshot.size-index==1){
              setflagLoadClasses('carregado')
              console.log('entrou no if da flag classes', idPeriodoSelec)
            } 
          });
        }
    });
    setListaClasses(classes);
    console.log('listaClasses',listaClasses)
  }
  data()   
  },[idPeriodoSelec,recarregarClasses]);

  const onPressItem = (item:any) =>{
    setClasseSelec(item.idClasse),
    setflagLoadAlunos('carregando')
    setFlagLoadFrequencia('carregando')
    setFlagLongPressClasse(false)
    setFlagLongPressAluno(false)
    setSelectedIdAluno('')
    setNumAlunoSelec('')

    //salvando estado da classe
    firestore().collection(idUsuario).
      doc('Dados').collection('Estados').
      doc('EstadosApp').set({
        idPeriodo:idPeriodoSelec,
        periodo:nomePeriodoSelec,
        idClasse:item.idClasse,
        classe:item.classe,
      })
  }

  const onLongPressItem = (item:any) =>{
    setClasseSelec(item.idClasse)
    setFlagLongPressClasse(true)
  }

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.idClasse === classeSelec ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.idClasse === classeSelec ? Globais.corTextoClaro : Globais.corTextoEscuro;

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
    if(idPeriodoSelec!=''){
      switch(flagLoadClasses){
        case 'vazio':
          return(
            <View>
                <Text style={styles.textLoad}>Adicione uma classe...</Text>
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
            <SafeAreaView >
              <FlatList
                horizontal = {true}
                data={listaClasses}
                renderItem={renderItem}
                keyExtractor={item => item.idClasse}
              />
            </SafeAreaView>
          )
      }
    }
  }

  return (
    <View>
      {renderCarregamento()}
    </View>
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
  textLoad:{
    fontSize:24,
    color:Globais.corTextoClaro,
  }
});

export default FlatListClasses;