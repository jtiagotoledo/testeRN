import React, {useContext, useState} from 'react';
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
  const [selected, setSelected] = useState('');
  const {periodoSelec,classeSelec,dataSelec,
    setDataSelec,modalCalendario,setModalCalendario} = useContext(Context);

  const onPressAddData = async () =>{
    const alunos:any[] = []
    
    await firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('ListaAlunos')
    .orderBy('numero')
    .get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      const numero = documentSnapshot.data().numero
      const nome = documentSnapshot.data().nome
      firestore().collection('Usuario')
        .doc(periodoSelec).collection('Classes')
        .doc(classeSelec).collection('Frequencia')
        .doc(dataSelec).collection('Alunos')
        .doc(numero+'').set({
          numero: numero,
          nome: nome,
          frequencia:'P'
        });
        setModalCalendario(!modalCalendario)
    });
    });
  }

  return (
    <View style={styles.container}>
      <Calendar 
        onDayPress={day => {
          setSelected(day.dateString);
          setDataSelec(day.dateString);
          console.log(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true}
        }}
      />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={onPressAddData}>
        <Text style={styles.textStyle}>Criar data</Text>
      </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container:{
    height:350,
    width:350
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
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Calendario;