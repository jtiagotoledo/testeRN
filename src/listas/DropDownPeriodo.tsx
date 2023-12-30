import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import {Icon} from '../componentes/Icon'
import {Context} from "../data/Provider";
import Globais from "../data/Globais";



const DropDownPeriodo = () =>{
  const [valuePSelec, setValuePSelec] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const {setIdPeriodoSelec,setFlagLongPressAluno,
      idUsuario,setModalMenu,setFlagLongPressClasse,setModalDelPeriodo,
      recarregarPeriodo,listaPeriodos,setListaPeriodos,
      setNomePeriodoSelec,nomePeriodoSelec,setModalEditPeriodo,abaSelec} = useContext(Context)

    const  periodos: any[]=[];

    useEffect(()=>{
        firestore().collection(idUsuario)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
          let label = documentSnapshot.data().periodo
          let value = documentSnapshot.data().periodo
          let idPeriodo = documentSnapshot.data().idPeriodo
          let periodo = documentSnapshot.data().periodo
            periodos.push({label:label,value:value,idPeriodo:idPeriodo,periodo:periodo});
        });
        setListaPeriodos(periodos)
        });
    },[recarregarPeriodo])

    const onChangePeriodo = (item:any) =>{
      setValuePSelec(item.periodo);
      setNomePeriodoSelec(item.periodo)
      setIdPeriodoSelec(item.idPeriodo);
      setIsFocus(false);
      setFlagLongPressClasse(false)
      setFlagLongPressAluno(false)
      setModalMenu(false);

      //Salvando estado do período
      firestore().collection(idUsuario).
      doc('EstadosApp').set({
        idPeriodo:item.idPeriodo,
        periodo:item.periodo,
        idClasse:'',
        classe:'',
        data:'',
        aba:'Classes'
      })
    }

    const renderLabel = () => {
      if (valuePSelec || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: Globais.corTextoEscuro }]}>
            Selecione o período:
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: Globais.corPrimaria }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listaPeriodos}
          value={nomePeriodoSelec}
          maxHeight={300}
          labelField="label"
          valueField="value"
          // renderLeftIcon={()=><Icon name="equalizer" color="white" size={20}/>}
          placeholder={!isFocus ? 'Selecione o período' : '...'}
          searchPlaceholder="Procurar..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {onChangePeriodo(item)}}          
          renderRightIcon={() => (
            <View style={styles.containerIcon}>
                <TouchableOpacity onPress={()=>setModalEditPeriodo(true)}>
                  <Icon
                    style={styles.icon}
                    color={isFocus ? Globais.corPrimaria : 'white'}
                    name="pencil"
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setModalDelPeriodo(true)}>
                <Icon
                  style={styles.icon}
                  color={isFocus ? Globais.corPrimaria : 'white'}
                  name="bin"
                  size={20}
                />
              </TouchableOpacity>
            </View>
            
          )}
        />
      </View>
    )
}

export default DropDownPeriodo;

const styles = StyleSheet.create({
    container: {
      backgroundColor: Globais.corSecundaria,
      padding: 8,
      width:'100%'
    },
    containerIcon: {
      flexDirection:'row'
    },
    dropdown: {
      height: 50,
      borderColor: Globais.corPrimaria,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 16,
    },
    label: {
      position: 'absolute',
      backgroundColor: Globais.corSecundaria,
      left: 22,
      top: 4,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });