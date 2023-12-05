import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, View, Text, StyleSheet, StatusBar, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from '../data/Globais';
import { TextInput } from 'react-native-paper';

type ItemData = {
  nome: string;
  numero: string;
  nota: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const FlatListNotas= () => {
  const notaAluno = {
    nome:'',
    numero:'',
    nota:''
  }
  
  const [selectedId, setSelectedId] = useState<string>();
  const {periodoSelec,classeSelec,dataSelec,flagLoadNotas,
    setFlagLoadNotas,setRecarregarNotas,listaNotas,setListaNotas,idUsuario} = useContext(Context)

  const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    
    <View style={styles.containerItem}>
      <View style={[styles.item, styles.nome]}>
        <Text style={[styles.title]}>{item.numero} {item.nome}</Text>
      </View>
      <View>
        <TextInput 
        style={styles.itemNota}
        placeholder='Nota'
        inputMode='numeric'
        onChangeText={(text)=>onChangeNota(item,text)}
        onBlur={salvarNota}
        defaultValue={item.nota}
        >
        </TextInput>
      </View>
    </View>
  );

  const onChangeNota = (item:ItemData,text:string) =>{
    notaAluno.nome=item.nome;
    notaAluno.numero=item.numero
    notaAluno.nota=text
  }

  const salvarNota = () =>{
    const numAluno = notaAluno.numero;
    firestore().collection(idUsuario)
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('Notas')
    .doc(dataSelec).collection('Alunos')
    .doc(numAluno+'').set({
      numero:notaAluno.numero,
      nome:notaAluno.nome,
      nota:notaAluno.nota
    });
  }
  
  useEffect(()=>{
      setListaNotas([{numero:'',nome:'',nota:''}]);
      setRecarregarNotas('');
      console.log('useEffect lista notas');
      setFlagLoadNotas('carregando');
      const subscriber = firestore().collection(idUsuario)
      .doc(periodoSelec).collection('Classes')
      .doc(classeSelec).collection('Notas')
      .doc(dataSelec).collection('Alunos')
      .orderBy('numero')
      .onSnapshot(snapshot => {
        if(snapshot.empty){
          setFlagLoadNotas('vazio');
        }else{
          let alunos:any[]=[]
          snapshot.forEach((documentSnapshot,index) => {
          alunos.push(documentSnapshot.data());
          setListaNotas(alunos);
          console.log('teste notas',documentSnapshot.data())
            if(snapshot.size-index==1){
              setFlagLoadNotas('carregado');
              console.log('entrou no if da flag notas')
            }
          });
        }    
      });
      
      return ()=> subscriber();
  },[classeSelec,dataSelec]);


  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.numero === selectedId ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.numero === selectedId ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => null}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderCarregamento = () =>{
    if(classeSelec!=''){
      if(dataSelec!=''){
        switch(flagLoadNotas){
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
                data={listaNotas}
                renderItem={renderItem}
                keyExtractor={item => item.numero}
                extraData={selectedId}
              />
            )
        }
      }else{
        return(
          <View>
              <Text style={styles.textLoad}>Selecione uma data...</Text>
          </View>
        )
      }
    }else{
      return(
        <View>
            <Text style={styles.textLoad}>Selecione uma Classe...</Text>
        </View>
      ) 
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
  containerItem:{
    flexDirection:'row',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: Globais.corTerciaria,
  },
  itemNota: {
    width:80,
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
  },
  textLoad:{
    fontSize:24,
    color:Globais.corTextoClaro,
  }
});

export default FlatListNotas;