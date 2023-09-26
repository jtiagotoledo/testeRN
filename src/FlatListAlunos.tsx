import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, View} from 'react-native'
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
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.numero} {item.nome}</Text>
  </TouchableOpacity>
);

const FlatListAlunos = () => {
    const alunos:any[] = []
    const [selectedId, setSelectedId] = useState<string>();
    const [listaAlunos,setListaALunos]=useState([{numero:'',nome:''}]);
    const {flagLoadAlunos,setflagLoadAlunos,periodoSelec,classeSelec,setNumAlunoSelec} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
    await firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('ListaAlunos')
    .orderBy('numero')
    .get().then(querySnapshot => {
    querySnapshot.forEach((documentSnapshot,index) => {
    alunos.push(documentSnapshot.data());
    if(querySnapshot.size-index==1){
      setflagLoadAlunos(true);
    }
    });
    });
    setListaALunos(alunos)
  }
  data()        
  },[periodoSelec,listaAlunos]);

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.numero === selectedId ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.numero === selectedId ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => [setSelectedId(item.numero),setNumAlunoSelec(item.numero.toString())]}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderCarregamento = () =>{
    if(classeSelec!=''){
        if(flagLoadAlunos){
            return(
                <FlatList
                  data={listaAlunos}
                  renderItem={renderItem}
                  keyExtractor={item => item.numero}
                  extraData={selectedId}
                />
            )
        }else{
            return(
                <View>
                    <Text style={styles.textLoad}>Carregando...</Text>
                </View>
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
    marginTop: StatusBar.currentHeight || 0,
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