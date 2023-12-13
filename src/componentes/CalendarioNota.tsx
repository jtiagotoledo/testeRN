import React, {useContext, useEffect} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Context} from "../data/Provider";
import Globais from '../data/Globais';
import firestore from '@react-native-firebase/firestore';

LocaleConfig.locales.br = {
  monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  monthNamesShort: ["Jan.","Fev.","Mar","Abr","Mai","Jun","Jul.","Ago","Set.","Out.","Nov.","Dez."],
  dayNames: ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};

LocaleConfig.defaultLocale = "br";

const CalendarioNota = () => {

  let datasMarcadas:any = {}
  const  datas: any[]=[];

  const {idPeriodoSelec,idClasseSelec,dataSelec,
    setDataSelec,modalCalendarioNota,setModalCalendarioNota} = useContext(Context);
  const {flagLoadCalendarioNotas,setflagLoadCalendarioNotas,setFlagLoadNotas,
    listaDatasNotas,setListaDatasNotas,setRecarregarNotas,recarregarCalendarioNotas,
    setRecarregarCalendarioNotas,listaDatasMarcadasNotas,setListaDatasMarcadasNotas,
    idUsuario} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
    /* essa consulta no BD retorna as datas ainda não 
    incluídas na lista de datas. */
    setflagLoadCalendarioNotas('carregando');
    setListaDatasNotas('');
    setListaDatasMarcadasNotas({})
    setRecarregarCalendarioNotas('');
    firestore().collection(idUsuario)
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('Notas')
    .onSnapshot(snapshot => {
      if(snapshot.empty){
        setflagLoadCalendarioNotas('carregado');
        console.log('snapshot vazio calendario');
      }
      snapshot.forEach((documentSnapshot, index) => {
        datas.push(documentSnapshot.id);
        datasMarcadas[documentSnapshot.id]={selected:true}
          if(snapshot.size-index==1){
            setflagLoadCalendarioNotas('carregado')
            console.log('entrou no if da flag calendário')
          }
      });
    });
    setListaDatasNotas(datas);
    setListaDatasMarcadasNotas(datasMarcadas)
  }
  data()        
  },[idClasseSelec,recarregarCalendarioNotas]); 

  const onPressAddData = async () =>{

    setModalCalendarioNota(!modalCalendarioNota);

    setflagLoadCalendarioNotas('inicio')
    firestore().collection(idUsuario)
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('Notas')
    .doc(dataSelec).set({});
    
    firestore().collection(idUsuario)
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('ListaAlunos')
    .orderBy('numero')
    .onSnapshot(snapshot => {
      snapshot.forEach(documentSnapshot => {
        const numero = documentSnapshot.data().numero;
        const nome = documentSnapshot.data().nome;
        firestore().collection(idUsuario)
        .doc(idPeriodoSelec).collection('Classes')
        .doc(idClasseSelec).collection('Notas')
        .doc(dataSelec).collection('Alunos')
        .doc(numero+'').set({
          numero: numero,
          nome: nome,
          nota:''
        }).then(setRecarregarNotas('recarregarFrequencia'))
      });
    });
    
    
  }

  const renderCarregamento = () =>{
    if(idClasseSelec!=''){
      switch(flagLoadCalendarioNotas){
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
                  setDataSelec(day.dateString);
                  setFlagLoadNotas('carregando');
                  setRecarregarNotas('recarregarFrequencia');
                  console.log(listaDatasNotas);
                  if(listaDatasNotas.includes(day.dateString)){
                    setModalCalendarioNota(!modalCalendarioNota)
                  }
                }}
                markedDates={listaDatasMarcadasNotas}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={()=>[onPressAddData(),setflagLoadCalendarioNotas('carregando')]}>
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

export default CalendarioNota;