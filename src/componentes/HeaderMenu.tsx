import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header as HeaderRNE} from '@rneui/themed';
import Globais from '../data/Globais';
import { Icon } from './Icon'
import { Context } from "../data/Provider";

type HeaderComponentProps = {
title: string;
view?: string;
};

const HeaderClasses: React.FunctionComponent<HeaderComponentProps> = (props) => {

  const {setModalMenu} = useContext(Context);
  
    return (
        <HeaderRNE
        backgroundColor = {Globais.corPrimaria}
        style={styles.headerContainer}
        leftComponent={
          <View style={styles.headerRight}>
              <TouchableOpacity onPress={()=>setModalMenu(false)}>
                <Icon name="equalizer" color="white" size={20}/>
              </TouchableOpacity>
          </View>
        }
        centerComponent={{ text:'Menu', style: styles.heading }}
        />
    );
};

const styles = StyleSheet.create({
headerContainer: {
  alignItems: 'center',
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
}
});

export default HeaderClasses;