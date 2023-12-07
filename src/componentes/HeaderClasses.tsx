import React, { useContext } from 'react';
import { StyleSheet,TouchableWithoutFeedback,View } from 'react-native';
import { Header as HeaderRNE} from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { Icon } from './Icon'
import { Context } from "../data/Provider";
import Globais from '../data/Globais';

type HeaderComponentProps = {
title: string;
view?: string;
};

const HeaderClasses: React.FunctionComponent<HeaderComponentProps> = (props) => {

    const {setModalDelAluno, setModalMenu, flagLongPressClasse,
      flagLongPressAluno,setModalDelClasse} = useContext(Context);

    const onPressBin = () =>{
      flagLongPressClasse?setModalDelClasse(true):null
      flagLongPressAluno?setModalDelAluno(true):null
    }

    return (
        <HeaderRNE
        backgroundColor = {Globais.corPrimaria}
        style={styles.headerContainer}
        leftComponent={
            <View style={styles.headerRight}>
                <TouchableOpacity onPress={()=>setModalMenu(true)}>
                  <Icon name="equalizer" color="white" size={20}/>
                </TouchableOpacity>
            </View>
        }
        rightComponent={
            <View style={styles.headerRight}>
              <TouchableWithoutFeedback>
                <Icon style={styles.icon} name="pencil" color="white" size={20}/>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onPressBin}>
                <Icon 
                style={styles.icon}  
                selectable={false}
                name="bin" 
                color={flagLongPressClasse||flagLongPressAluno?'rgba(255,255,255,1)':'rgba(255,255,255,0.6)'}
                size={20}/>
              </TouchableWithoutFeedback>
            </View>
        }
        centerComponent={{ text:'Classes', style: styles.heading }}
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
icon:{
  marginLeft:10,
  marginRight:10,
},
subheaderText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});

export default HeaderClasses;