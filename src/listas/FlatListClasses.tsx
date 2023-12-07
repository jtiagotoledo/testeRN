import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from '../data/Globais';

type ItemData = {
  classe: string;
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
    const {periodoSelec,classeSelec,setClasseSelec,setModalDelClasse,recarregarClasses} = useContext(Context)
    const {flagLoadClasses,setflagLoadAlunos,setflagLoadClasses,
      setFlagLoadFrequencia,listaClasses,setListaClasses,
      setRecarregarClasses,idUsuario,setFlagLongPressClasse} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
      setListaClasses('');
      setRecarregarClasses('');
      setflagLoadClasses('carregando');
      firestore().collection(idUsuario)
      .doc(periodoSelec).collection('Classes')
      .onSnapshot(snapshot => {
        if(snapshot.empty){
          setflagLoadClasses('vazio');
          console.log('entrouaqui')
        }else{
          snapshot.forEach((documentSnapshot,index) => {
          classes.push(documentSnapshot.data());
            if(snapshot.size-index==1){
              setflagLoadClasses('carregado')
              console.log('entrou no if da flag classes')
              console.log('periodoSelec',periodoSelec)
            } 
          });
        }
    });
    setListaClasses(classes);
  }
  data()   
  },[periodoSelec,recarregarClasses]);

  const onPressItem = (item:any) =>{
    setClasseSelec(item.classe),
    setflagLoadAlunos('carregando')
    setFlagLoadFrequencia('carregando')
    setFlagLongPressClasse(false)

    //salvando estado da classe
    firestore().collection(idUsuario).
      doc('Dados').collection('Estados').
      doc('EstadosApp').update({
        classe:item.classe
      })
  }

  const onLongPressItem = (item:any) =>{
    setClasseSelec(item.classe)
    setFlagLongPressClasse(true)
  }

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.classe === classeSelec ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.classe === classeSelec ? Globais.corTextoClaro : Globais.corTextoEscuro;

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
    if(periodoSelec!=''){
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
                keyExtractor={item => item.classe}
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