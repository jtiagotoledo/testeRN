import React, { useContext, useEffect, useRef, useState } from 'react'
import {SafeAreaView, FlatList, View, Text, StyleSheet, StatusBar, TextInput} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from '../data/Globais';

type ItemData = {
  nome: string;
  numero: string;
  nota: string;
  idAluno: string;
};

const FlatListNotas= () => {
  const notaAluno = {
    nome:'',
    numero:'',
    nota:'',
    idAluno:''
  }

  const flatListRef = useRef<FlatList>(null);
  const textInputRefs = useRef<TextInput[]>([]);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [textNota, setTextNota] = useState('');
  const [idNota, setIdNota] = useState('');
  const {idPeriodoSelec,idClasseSelec,dataSelec,flagLoadNotas,
    setFlagLoadNotas,setRecarregarNotas,listaNotas,setListaNotas,idUsuario} = useContext(Context)

  const onChangeNota = (item:ItemData,text:string) =>{
    notaAluno.nome=item.nome;
    notaAluno.numero=item.numero
    notaAluno.nota=text
    notaAluno.idAluno=item.idAluno
    listaNotas[parseInt(item.numero)-1].nota=text
    setTextNota(text)
    setIdNota(item.idAluno)
  }

  const salvarNota = () =>{
    if(textNota!=''){
      firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .doc(idClasseSelec).collection('Notas')
      .doc(dataSelec).collection('Alunos')
      .doc(idNota).update({
        nota:textNota
      });
    }
  }
  
  useEffect(()=>{
      console.log('recarregouNotas')
      setListaNotas([{numero:'',nome:'',nota:'',idAluno:''}]);
      setRecarregarNotas('');
      setFlagLoadNotas('carregando');
      firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .doc(idClasseSelec).collection('Notas')
      .doc(dataSelec).collection('Alunos')
      .orderBy('numero')
      .get().then(snapshot => {
        if(snapshot.empty){
          setFlagLoadNotas('vazio');
        }else{
          let alunos:any[]=[]
          snapshot.forEach((documentSnapshot,index) => {
          alunos.push(documentSnapshot.data());
          setListaNotas(alunos);
            if(snapshot.size-index==1){
              setFlagLoadNotas('carregado');
            }
          });
        }    
      });
      
  },[idClasseSelec,dataSelec]);

  const renderItem= ({item}:{item:ItemData}) => {
    
    const scrollToItem = (itemId:any,itemNumero:any) => {
      const index = listaNotas.findIndex((item:any) => item.idAluno === itemId);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
        
      }
    };


    const nextItem = (itemId:any,itemNumero:any,itemNota:any) => {
      const index = listaNotas.findIndex((item:any) => item.idAluno === itemId);
      // listaNotas[index].nota=textNota
      setTimeout(()=>{
        if (index !== -1 && flatListRef.current) {
          textInputRefs.current[itemNumero + 1]?.focus()
          const sizeText = listaNotas[index+1].nota.length
          setSelection({start:sizeText,end:sizeText})
        }
      },300)
    };

    const onSelectionChange = (event:any) => {
      const { nativeEvent } = event;
      const {selection} = nativeEvent
      setSelection(selection)
    };

    

    return (
      <View style={styles.containerItem}>
        <View style={[styles.item, styles.nome]}>
          <Text style={[styles.title]}>{item.numero} {item.nome}</Text>
        </View>
        <View>
          <TextInput 
          ref={(ref) => (textInputRefs.current[parseInt(item.numero)] = ref!)}
          style={styles.itemNota}
          placeholder='Nota'
          inputMode='numeric'
          onChangeText={(text)=>onChangeNota(item,text)}
          defaultValue={item.nota}
          onFocus={() => scrollToItem(item.idAluno,item.numero)}
          onSubmitEditing={()=>[nextItem(item.idAluno,item.numero,item.nota),salvarNota()]}
          selection={selection}
          onSelectionChange={(syntheticEvent)=>onSelectionChange(syntheticEvent)}
          >
          </TextInput>
        </View>
      </View>
    );
  };

  const renderCarregamento = () =>{
    if(idClasseSelec!=''){
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
                ref={flatListRef}
                keyExtractor={item => item.idAluno}
                contentContainerStyle={{paddingBottom:300}}
                keyboardShouldPersistTaps='handled'
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