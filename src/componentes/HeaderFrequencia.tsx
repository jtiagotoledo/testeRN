import React, { useContext } from 'react';
import {StyleSheet,View} from 'react-native';
import { Header as HeaderRNE} from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import {Icon} from './Icon'
import {Context} from "../data/Provider";
import Globais from '../data/Globais';

type HeaderComponentProps = {
title: string;
view?: string;
};

const HeaderFrequencia: React.FunctionComponent<HeaderComponentProps> = (props) => {

    const {setModalDelAluno} = useContext(Context);
    
    return (
        <HeaderRNE
        backgroundColor = {Globais.corPrimaria}
        style={styles.headerContainer}
        leftComponent={
            <View style={styles.headerRight}>
                <TouchableOpacity>
                <Icon name="menu" color="white" size={20}/>
                </TouchableOpacity>
            </View>
        }
        rightComponent={
            <View style={styles.headerRight}>
                <TouchableOpacity onPress={()=>setModalDelAluno(true)}>
                <Icon name="bin" color="white" size={20}/>
                </TouchableOpacity>
            </View>
        }
        centerComponent={{ text: 'Frequência', style: styles.heading }}
        />
    
    );
};

const styles = StyleSheet.create({
headerContainer: {
  alignItems: 'center',
  backgroundColor: '#397af8',
  marginBottom: 20,
  width: '100%',
  paddingVertical: 15,
  
},
heading: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
},
headerRight: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
},
subheaderText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});

export default HeaderFrequencia;