import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, Button, FlatList, Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";
import Globais from './Globais';

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
    const [selectedId, setSelectedId] = useState<string>();
    const {periodoSelec,classeSelec,setClasseSelec,setModalDelClasse,recarregarClasses} = useContext(Context)
    const {flagLoadClasses,setflagLoadAlunos,setflagLoadClasses,
      setFlagLoadFrequencia,listaClasses,setListaClasses,setRecarregarClasses} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
      setListaClasses('');
      setRecarregarClasses('');
      setflagLoadClasses('carregando');
      firestore().collection('Usuario')
      .doc(periodoSelec).collection('Classes')
      .onSnapshot(snapshot => {
        if(snapshot.empty){
          setflagLoadClasses('vazio')
        }else{
          snapshot.forEach((documentSnapshot,index) => {
          classes.push(documentSnapshot.data());
            if(snapshot.size-index==1){
              setflagLoadClasses('carregado')
              console.log('entrou no if da flag classes')
            } 
          });
        }
    });
    setListaClasses(classes);
  }
  data()   
  },[periodoSelec,recarregarClasses]);


  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.classe === selectedId ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.classe === selectedId ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
        <Item
        item={item}
        onPress={() => [setSelectedId(item.classe),
          setClasseSelec(item.classe), 
          setflagLoadAlunos('carregando'),
          setFlagLoadFrequencia('carregando'),
          console.log(classeSelec)]}
        onLongPress={()=>setModalDelClasse(true)}
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
                extraData={selectedId}
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