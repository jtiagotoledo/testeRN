import { View, StyleSheet, Text} from "react-native"
import React, { useContext} from 'react';
import { Context } from "./data/Provider";

import Fab from "./Fab";
import DropDown from "./DropDown";
import FlatListClasses from "./FlatListClasses";
import CustomChips from "./CustomChips";
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
      <CustomChips></CustomChips>
      <Text style={styles.text}>Classe selecionada: {classeSelec}</Text>
      <Text style={styles.text}>Aluno selecionado: {numAlunoSelec}</Text>
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
  text:{
    fontSize:24,
  }
});

export default Classes;