import { View, StyleSheet, Text} from "react-native"
import React, { useContext} from 'react';
import { Context } from "./data/Provider";
import { Divider } from "react-native-paper";

import Fab from "./Fab";
import DropDown from "./DropDown";
import FlatListClasses from "./FlatListClasses";
import ListaClassesChips from "./ListaClassesChips";
import HeaderClasses from "./HeaderClasses";
import Globais from "./Globais";

import ModalAddPeriodo from "./ModalAddPeriodo";
import ModalAddClasse from "./ModalAddClasse";
import ModalAddAluno from "./ModalAddAluno";
import ModalDelAluno from "./ModalDelAluno";

function Classes() {
    
  const {classeSelec, numAlunoSelec} = useContext(Context)

  return (
    <View style={styles.container}>
      <HeaderClasses title="Classes"></HeaderClasses>
      <DropDown ></DropDown>
      <Text style={styles.text}>Selecione uma classe:</Text>
      <View style={styles.containerListaClasses}>
        <ListaClassesChips></ListaClassesChips>
      </View>
      <Divider style={styles.divider}></Divider>
      <Text style={styles.text}>Classe selecionada: {classeSelec}</Text>
      <Divider style={styles.divider}></Divider>
      <FlatListClasses></FlatListClasses>
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
      <ModalAddAluno></ModalAddAluno>
      <ModalDelAluno></ModalDelAluno>
      <Fab></Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: Globais.corSecundaria,
    flex:1,
  },
  containerListaClasses:{
    minHeight:80
  },
  text:{
    fontSize:20,
    padding:5,
    color: Globais.corTextoEscuro,
  },
  divider:{
    backgroundColor: Globais.corPrimaria,
  }
});

export default Classes;