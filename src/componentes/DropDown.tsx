import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, View } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import {Icon} from './Icon'
import {Context} from "../data/Provider";
import Globais from "../data/Globais";

const DropDown = () =>{
    const [valuePSelec, setValuePSelec] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [valuePeriodo,setValuePeriodo] = useState([{label:'',value:''}]);
    const {setPeriodoSelec,setflagLoadClasses,setListaClasses} = useContext(Context)

    const  listaPeriodos: any[]=[];

    useEffect(()=>{
        const data = async ()=>{
        await firestore().collection('Usuario').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        let id = documentSnapshot.id
        listaPeriodos.push({label:id,value:id});
      });
      setValuePeriodo(listaPeriodos) 
      });
    }
    data()   
    })

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
          data={valuePeriodo}
          search
          value={valuePSelec}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Selecione o período' : '...'}
          searchPlaceholder="Procurar..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValuePSelec(item.label);
            setPeriodoSelec(item.label);
            setIsFocus(false);
            setflagLoadClasses(false);
            console.log(item.label);
          }}          
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={isFocus ? Globais.corPrimaria : 'black'}
              name="checkmark2"
              size={20}
            />
          )}
        />
      </View>
    )
}

export default DropDown;

const styles = StyleSheet.create({
    container: {
      backgroundColor: Globais.corSecundaria,
      padding: 8,
      width:'100%'
    },
    dropdown: {
      height: 50,
      borderColor: Globais.corPrimaria,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
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