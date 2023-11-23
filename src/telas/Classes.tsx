import { View, StyleSheet, Text, Button} from "react-native"
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
import ModalMenu from "../modais/ModalMenu";

function Classes({navigation}:any) {
    
  return (
    <View style={styles.container}>
      <HeaderClasses title="Classes"></HeaderClasses>
      <Text>{auth().currentUser?.email}</Text>
      <Button title="sair" onPress={()=>
        auth().signOut()
        .then(()=>[
          console.log('usuário saiu'),
          navigation.reset({index:0,routes:[{name:"Login"}]})
        ])}></Button>
      <DropDown ></DropDown>
      <FlatListClasses></FlatListClasses>
      <Divider style={styles.divider}></Divider>
      <FlatListAlunos></FlatListAlunos>
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
      <ModalAddAluno></ModalAddAluno>
      <ModalDelAluno></ModalDelAluno>
      <ModalDelClasse></ModalDelClasse>
      <ModalMenu></ModalMenu>
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