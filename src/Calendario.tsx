import React, {useContext, useEffect, useState} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Context} from "./data/Provider";
import Globais from './Globais';
import firestore from '@react-native-firebase/firestore';

let datasMarcadas:any = {}
// const  listaDatas: any[]=[];

LocaleConfig.locales.br = {
  monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  monthNamesShort: ["Jan.","Fev.","Mar","Abr","Mai","Jun","Jul.","Ago","Set.","Out.","Nov.","Dez."],
  dayNames: ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};

LocaleConfig.defaultLocale = "br";

const Calendario = () => {
  const {periodoSelec,classeSelec,dataSelec,
    setDataSelec,modalCalendario,setModalCalendario} = useContext(Context);
  const {flagLoadCalendario,setflagLoadCalendario,setFlagLoadFrequencia,
    listaDatas,setListaDatas,setRecarregarFrequencia,recarregarCalendario,setRecarregarCalendario} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
    /* essa consulta no BD retorna as datas ainda não 
    incluídas na lista de datas. */

    setflagLoadCalendario('carregando');
    if(listaDatas.length==0){
      setflagLoadCalendario('carregado')
      console.log('vazio')
    }
    setListaDatas('');
    setRecarregarCalendario('');
    firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('Frequencia')
    .onSnapshot(snapshot => {
      snapshot.forEach((documentSnapshot, index) => {
        if(!listaDatas.includes(documentSnapshot.id)){
          setListaDatas(documentSnapshot.id)
          datasMarcadas[documentSnapshot.id]={selected:true}
        }
        if(snapshot.size-index==1){
          setflagLoadCalendario('carregado')
          console.log('entrou no if da flag calendário')
        }
      });
    });
    console.log('listaDatas',listaDatas) 
  }
  data()        
  },[classeSelec,recarregarCalendario]); 

  const onPressAddData = async () =>{
    setflagLoadCalendario('inicio')
    firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('Frequencia')
    .doc(dataSelec).set({});
    
    firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('ListaAlunos')
    .orderBy('numero')
    .onSnapshot(snapshot => {
      snapshot.forEach(documentSnapshot => {
        const numero = documentSnapshot.data().numero;
        const nome = documentSnapshot.data().nome;
        firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .doc(classeSelec).collection('Frequencia')
        .doc(dataSelec).collection('Alunos')
        .doc(numero+'').set({
          numero: numero,
          nome: nome,
          frequencia:'P'
        })
      });
    });
    
    setRecarregarFrequencia('recarregarFrequencia');
    setModalCalendario(!modalCalendario);
  }

  const renderCarregamento = () =>{
    if(classeSelec!=''){
      switch(flagLoadCalendario){
        case 'carregando':
          return(
            <View>
              <Text style={styles.textLoad}>Carregando...</Text>
            </View>
          )
        case 'carregado':
          return(
            <View style={styles.container}>
              <Calendar
                onDayPress={day => {
                  setDataSelec(day.dateString.toString());
                  setFlagLoadFrequencia('carregando')
                  console.log(listaDatas);
                  if(listaDatas.includes(day.dateString)){
                    setModalCalendario(!modalCalendario)
                  }
                }}
                markedDates={datasMarcadas}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={()=>[onPressAddData(),setRecarregarCalendario('recarregarCalendário'),setflagLoadCalendario('carregando')]}>
                <Text style={styles.textStyle}>Criar data</Text>
              </Pressable>
            </View>
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
  container:{
    height:350,
    width:350,
    marginBottom:24
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Globais.corPrimaria,
    marginTop:24,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textLoad:{
    fontSize:24,
    color:Globais.corTextoClaro,
  }
});

export default Calendario;