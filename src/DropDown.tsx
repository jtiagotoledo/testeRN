import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import {Icon} from './Icon'

const data = [
    { label: '2018', value: '2018' },
    { label: '2019', value: '2' },
    { label: '2020', value: '3' },
    { label: '2021', value: '4' },
    { label: '2022', value: '5' },
    { label: '2023', value: '6' },
    { label: '2024', value: '7' },
    { label: '2025', value: '8' },
  ];

  

const DropDown = () =>{
    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [valuePeriodo,setValuePeriodo] = useState('')

    
    const  listaPeriodos:any[]=[''];

    
    useEffect(()=>{
        const data = async ()=>{
        await firestore().collection('Usuario').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        listaPeriodos.push({label:documentSnapshot.id, value:documentSnapshot.id});
        console.log(listaPeriodos)
      });
      // setValuePeriodo(listaPeriodos)  
        
      });
        
    }
    data()     
    })

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
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
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listaPeriodos}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={valuePeriodo}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            console.log(item.label)
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
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
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
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