import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
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
    nota:'',
    idAluno:''
  }

  const flatListRef = useRef<FlatList>(null);
  const [selectedId, setSelectedId] = useState<string>();
  const {idPeriodoSelec,idClasseSelec,dataSelec,flagLoadNotas,
    setFlagLoadNotas,setRecarregarNotas,listaNotas,setListaNotas,idUsuario} = useContext(Context)

  const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => {
    
    const scrollToItem = (itemId:any) => {
      const index = listaNotas.findIndex((item:any) => item.idAluno === itemId);
      console.log('index',index)
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    };

    const nextItem = (itemId:any) => {
      const index = listaNotas.findIndex((item:any) => item.idAluno === itemId);
  
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index:index+1, animated: true });
      }
    };
    
    return(
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
        onFocus={() => scrollToItem(item.idAluno)}
        onSubmitEditing={()=>nextItem(item.idAluno)}
        >
        </TextInput>
      </View>
    </View>

    )
  }

  const onChangeNota = (item:ItemData,text:string) =>{
    console.log(typeof(text))
    notaAluno.nome=item.nome;
    notaAluno.numero=item.numero
    notaAluno.nota=text
    notaAluno.idAluno=item.idAluno
  }

  const salvarNota = () =>{
    if(notaAluno.nota!=''){
      const idAluno = notaAluno.idAluno;
      firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .doc(idClasseSelec).collection('Notas')
      .doc(dataSelec).collection('Alunos')
      .doc(idAluno).update({
        numero:notaAluno.numero,
        nome:notaAluno.nome,
        nota:notaAluno.nota
      });
    }
  }
  
  useEffect(()=>{
      setListaNotas([{numero:'',nome:'',nota:'',idAluno:''}]);
      setRecarregarNotas('');
      setFlagLoadNotas('carregando');
      const subscriber = firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .doc(idClasseSelec).collection('Notas')
      .doc(dataSelec).collection('Alunos')
      .orderBy('numero')
      .onSnapshot(snapshot => {
        if(snapshot.empty){
          setFlagLoadNotas('vazio');
        }else{
          let alunos:any[]=[]
          let inputRefs:any[] = ([])
          snapshot.docs.map(()=>inputRefs.push(createRef()))
          console.log('inputRefs',inputRefs)
          snapshot.forEach((documentSnapshot,index) => {
          alunos.push(documentSnapshot.data());
          setListaNotas(alunos);
            if(snapshot.size-index==1){
              setFlagLoadNotas('carregado');
            }
          });
        }    
      });
      
      return ()=> subscriber();
  },[idClasseSelec,dataSelec]);


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
                extraData={selectedId}
                contentContainerStyle={{paddingBottom:300}}
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