import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from '../componentes/Icon'
import Classes from '../telas/Classes';
import Frequencia from '../telas/Frequencia';
import Notas from '../telas/Notas';
import Provider from "../data/Provider";
import Globais from '../data/Globais';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Context} from "../data/Provider";

const Tab = createBottomTabNavigator();

const App = ({navigation}:any) => {
  const {idUsuario,setAbaSelec,setDataSelec} = useContext(Context)
    
    useEffect(()=>{
      //recuperar a última aba selecionada
      const usuario = auth().currentUser?.email
      firestore().collection(usuario+'')
      .doc('EstadosApp').onSnapshot(snapShot=>{
        navigation.navigate(snapShot.data()?.aba)
        setAbaSelec(snapShot.data()?.aba)
      })
    },[])

  const cliqueClasses = () =>{
    //setar o nome da aba selecionada
    firestore().collection(idUsuario).
    doc('EstadosApp').update({
        aba:'Classes'
    })
  }

  const cliqueFrequencia = () =>{
    //setar o nome da aba selecionada
    firestore().collection(idUsuario).
    doc('EstadosApp').update({
        aba:'Frequencia'
    })
  }

  const cliqueNotas = () =>{
    //setar o nome da aba selecionada
    firestore().collection(idUsuario).
    doc('EstadosApp').update({
        aba:'Notas'
    })
  }

  return (
    <Provider>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            headerShown:false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName='';
              if (route.name === 'Classes') {
                iconName = 'book'
              } else if (route.name === 'Frequencia') {
                iconName = 'calendar'
              }else if (route.name === 'Notas') {
                iconName = 'pencil'
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Globais.corPrimaria,
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={()=>cliqueClasses()}/>
            )}} name="Classes" component={Classes}></Tab.Screen>
          <Tab.Screen options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={()=>cliqueFrequencia()}/>
            )}}name="Frequencia" component={Frequencia} />
          <Tab.Screen options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={()=>cliqueNotas()}/>
            )}}name="Notas" component={Notas}/>
        </Tab.Navigator>
    </Provider>
  );
};

const styles = StyleSheet.create({
  iconDelete:{
    paddingRight:16
}
});

export default App;
