import { View, StyleSheet, Text, Button} from "react-native"
import { Divider } from "react-native-paper";

import FabClasses from "../componentes/FabClasses";
import FlatListAlunos from "../listas/FlatListAlunos";
import FlatListClasses from "../listas/FlatListClasses";
import HeaderClasses from "../componentes/HeaderClasses";
import ConexaoInternet from "../componentes/ConexaoInternet";
import Globais from "../data/Globais";

import { useContext, useEffect } from "react";
import ModalAddPeriodo from "../modais/ModalAddPeriodo";
import ModalAddClasse from "../modais/ModalAddClasse";
import ModalAddAluno from "../modais/ModalAddAluno";
import ModalEditPeriodo from "../modais/ModalEditPeriodo";
import ModalEditClasse from "../modais/ModalEditClasse";
import ModalDelPeriodo from "../modais/ModalDelPeriodo";
import ModalDelClasse from "../modais/ModalDelClasse";
import ModalDelAluno from "../modais/ModalDelAluno";
import ModalMenu from "../modais/ModalMenu";
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";


function Classes({navigation}:any) {

  const {nomePeriodoSelec,idUsuario,setIdPeriodoSelec,setClasseSelec,
    setNomePeriodoSelec} = useContext(Context)
    
  useEffect(()=>{
    //recuperar dados dos estados do app
    firestore().collection(idUsuario).
    doc('Dados').collection('Estados')
    .doc('EstadosApp').onSnapshot(snapShot=>{
      setIdPeriodoSelec(snapShot.data()?.idPeriodo)
      setNomePeriodoSelec(snapShot.data()?.periodo)
      setClasseSelec(snapShot.data()?.idClasse)
      console.log('estadoPeriodoUseEfectPeriodo',snapShot.data()?.periodo)
      console.log('estadoClasseUseEfectClasses',snapShot.data()?.classe)
    })
  },[])
    
  return (
    <View style={styles.container}>
      <HeaderClasses title="Classes"></HeaderClasses>
      <ConexaoInternet></ConexaoInternet>
      <Text style={styles.textLoad}>{nomePeriodoSelec!=''?'Período: '+nomePeriodoSelec:'Selecione um período'}</Text>
      <Divider style={styles.divider}></Divider>
      <FlatListClasses></FlatListClasses>
      <Divider style={styles.divider}></Divider>
      <FlatListAlunos></FlatListAlunos>
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
      <ModalAddAluno></ModalAddAluno>
      <ModalEditPeriodo></ModalEditPeriodo>
      <ModalEditClasse></ModalEditClasse>
      <ModalDelPeriodo></ModalDelPeriodo>
      <ModalDelClasse></ModalDelClasse>
      <ModalDelAluno></ModalDelAluno>
      <ModalMenu navigation={navigation}></ModalMenu>
      <FabClasses></FabClasses>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: Globais.corSecundaria,
    flex:1,
  },
  
  text:{
    fontSize:20,
    padding:5,
    color: Globais.corTextoEscuro,
  },
  divider:{
    backgroundColor: Globais.corPrimaria,
  },
  textLoad:{
    fontSize:24,
    color:Globais.corTextoClaro,
  }
});

export default Classes;