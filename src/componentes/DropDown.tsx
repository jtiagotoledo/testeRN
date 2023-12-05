import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import {Icon} from './Icon'
import {Context} from "../data/Provider";
import Globais from "../data/Globais";



const DropDown = () =>{
    const [valuePSelec, setValuePSelec] = useState({periodo:''});
    const [isFocus, setIsFocus] = useState(false);
    const [valuePeriodo,setValuePeriodo] = useState([{label:'',value:''}]);
    const {setPeriodoSelec,setflagLoadClasses,idUsuario} = useContext(Context)

    const  listaPeriodos: any[]=[];

    useEffect(()=>{
        const data = async ()=>{
        await firestore().collection(idUsuario)
        .get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
          let id = documentSnapshot.id
          listaPeriodos.push({label:id,value:id});
        });
        setValuePeriodo(listaPeriodos) 
        });

        const estadoPeriodo = firestore().collection(idUsuario).
        doc('Estados').get().then()
        // setValuePSelec((await estadoPeriodo).data().periodo||{periodo:''})
        console.log('estadoPeriodo',(await estadoPeriodo).data())
    }
    data()   
    },[])

    const onChangePeriodo = (item:any) =>{
      setValuePSelec(item.label);
      setPeriodoSelec(item.label);
      setIsFocus(false);
      setflagLoadClasses(false);
      console.log(item.label);

      //Salvando estado do período
      firestore().collection(idUsuario).
      doc('Estados').set({
        periodo:item.label
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
          data={valuePeriodo}
          value={valuePSelec.periodo}
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
            <TouchableOpacity>
              <Icon
                style={styles.icon}
                color={isFocus ? Globais.corPrimaria : 'black'}
                name="bin"
                size={20}
              />
            </TouchableOpacity>
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