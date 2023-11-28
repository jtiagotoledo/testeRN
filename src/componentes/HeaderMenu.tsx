import React from 'react';
import { StyleSheet } from 'react-native';
import { Header as HeaderRNE} from '@rneui/themed';
import Globais from '../data/Globais';

type HeaderComponentProps = {
title: string;
view?: string;
};

const HeaderClasses: React.FunctionComponent<HeaderComponentProps> = (props) => {

    return (
        <HeaderRNE
        backgroundColor = {Globais.corPrimaria}
        style={styles.headerContainer}
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
});

export default HeaderClasses;