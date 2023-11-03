import React, {useContext, useEffect} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Context} from "./data/Provider";
import Globais from './Globais';
import firestore from '@react-native-firebase/firestore';

LocaleConfig.locales.br = {
  monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  monthNamesShort: ["Jan.","Fev.","Mar","Abr","Mai","Jun","Jul.","Ago","Set.","Out.","Nov.","Dez."],
  dayNames: ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};

LocaleConfig.defaultLocale = "br";

const Calendario = () => {

  let datasMarcadas:any = {}
  const  datas: any[]=[];

  const {periodoSelec,classeSelec,dataSelec,
    setDataSelec,modalCalendario,setModalCalendario} = useContext(Context);
  const {flagLoadCalendario,setflagLoadCalendario,setFlagLoadFrequencia,
    listaDatas,setListaDatas,setRecarregarFrequencia,recarregarCalendario,
    setRecarregarCalendario,listaDatasMarcadas,setListaDatasMarcadas} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
    /* essa consulta no BD retorna as datas ainda não 
    incluídas na lista de datas. */
    console.log('useEffect calendario')
    setflagLoadCalendario('carregando');
    setListaDatas('');
    setListaDatasMarcadas({})
    setRecarregarCalendario('');
    firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('Frequencia')
    .onSnapshot(snapshot => {
      if(snapshot.empty){
        setflagLoadCalendario('carregado');
        console.log('snapshot vazio calendario');
      }
      snapshot.forEach((documentSnapshot, index) => {
        datas.push(documentSnapshot.id);
        datasMarcadas[documentSnapshot.id]={selected:true}
          if(snapshot.size-index==1){
            setflagLoadCalendario('carregado')
            console.log('entrou no if da flag calendário')
          }
      });
    });
    setListaDatas(datas);
    setListaDatasMarcadas(datasMarcadas)
    console.log('listaDatas',listaDatas) 
  }
  data()        
  },[classeSelec,recarregarCalendario]); 

  const onPressAddData = async () =>{

    setModalCalendario(!modalCalendario);

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
        }).then(setRecarregarFrequencia('recarregarFrequencia'))
      });
    });
    
    
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
                  setFlagLoadFrequencia('carregando');
                  setRecarregarFrequencia('recarregarFrequencia');
                  console.log(listaDatas);
                  if(listaDatas.includes(day.dateString)){
                    console.log('listaDatasMarcadas',listaDatasMarcadas)
                    setModalCalendario(!modalCalendario)
                  }
                }}
                markedDates={listaDatasMarcadas}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={()=>[onPressAddData(),setflagLoadCalendario('carregando')]}>
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