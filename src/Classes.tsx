import { View, StyleSheet, Text} from "react-native"
import React, { useContext} from 'react';
import DropDown from "./DropDown";
import BtnAddPeriodo from "./BtnAddPeriodo";
import ModalAddPeriodo from "./ModalAddPeriodo";
import ModalAddClasse from "./ModalAddClasse";
import { Context } from "./data/Provider";
import CustomChips from "./CustomChips";
import BtnAddClasse from "./BtnAddClasse";
import FlatListClasses from "./FlatListClasses";
import BtnAddAluno from "./BtnAddAluno";
import BtnDelAluno from "./BtnDelAluno";
import ModalAddAluno from "./ModalAddAluno";

function Classes() {
    
  const {classeSelec, numAlunoSelec} = useContext(Context)

  return (
    <View style={styles.container}>
      <View style={styles.contDropBtnAddPer}>
        <DropDown ></DropDown>
        <BtnAddPeriodo/>
      </View>
      <View>
        <Text style={styles.text}>Selecione uma classe:</Text>
        <View style={styles.contChipsBtnAddClasse}>
          <CustomChips></CustomChips>
          <BtnAddClasse></BtnAddClasse>
        </View>
      </View>
      <BtnAddAluno></BtnAddAluno>
      <BtnDelAluno></BtnDelAluno>
      <Text style={styles.text}>Classe selecionada: {classeSelec}</Text>
      <Text style={styles.text}>Aluno selecionado: {numAlunoSelec}</Text>
      <FlatListClasses></FlatListClasses>
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
      <ModalAddAluno></ModalAddAluno>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
  },
  contDropBtnAddPer:{
    flexDirection:'row',
  },
  contChipsBtnAddClasse:{
    flexDirection:'row',
  },
  text:{
    fontSize:24,
    alignContent:'center',
    justifyContent:'center',
    
  }
  
});

export default Classes;