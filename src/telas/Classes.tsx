import { View, StyleSheet, Text} from "react-native"
import { Divider } from "react-native-paper";
import auth from '@react-native-firebase/auth';

import FabClasses from "../componentes/FabClasses";
import DropDown from "../componentes/DropDown";
import FlatListAlunos from "../listas/FlatListAlunos";
import FlatListClasses from "../listas/FlatListClasses";
import HeaderClasses from "../componentes/HeaderClasses";
import Globais from "../data/Globais";

import ModalAddPeriodo from "../modais/ModalAddPeriodo";
import ModalAddClasse from "../modais/ModalAddClasse";
import ModalAddAluno from "../modais/ModalAddAluno";
import ModalDelAluno from "../modais/ModalDelAluno";
import ModalDelClasse from "../modais/ModalDelClasse";

function Classes() {
    
  return (
    <View style={styles.container}>
      <HeaderClasses title="Classes"></HeaderClasses>
      <Text>{auth().currentUser?.email}</Text>
      <DropDown ></DropDown>
      <FlatListClasses></FlatListClasses>
      <Divider style={styles.divider}></Divider>
      <FlatListAlunos></FlatListAlunos>
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
      <ModalAddAluno></ModalAddAluno>
      <ModalDelAluno></ModalDelAluno>
      <ModalDelClasse></ModalDelClasse>
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
  }
});

export default Classes;