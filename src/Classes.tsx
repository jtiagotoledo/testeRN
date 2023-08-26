import { View, StyleSheet, Text} from "react-native"
import React, { useContext} from 'react';
import DropDown from "./DropDown";
import BtnAddPeriodo from "./BtnAddPeriodo";
import ModalAddPeriodo from "./ModalAddPeriodo";
import ModalAddClasse from "./ModalAddClasse";
import { Context } from "./data/Provider";
import CustomChips from "./CustomChips";
import BtnAddClasse from "./BtnAddClasse";

function Classes() {
    
  const {periodoSelec} = useContext(Context)

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
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
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
    fontSize:18,
    alignContent:'center',
    justifyContent:'center',
    
  }
  
});

export default Classes;