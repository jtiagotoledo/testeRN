import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Chip } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../src/data/Provider';
import Globais from '../src/data/Globais';


const ListaClassesChips = () => {
    let listaChipsClasses: any = '';
    const listaClasses: any[] = [];
    const [chipsClasses, setChipsClasses] = useState('')
    const { flagLoadClasses, setflagLoadClasses } = useContext(Context)
    const { periodoSelec, setClasseSelec } = useContext(Context)


    useEffect(() => {
        const data = async () => {
            await firestore().collection('Usuario')
                .doc(periodoSelec).collection('Classes')
                .get().then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        listaClasses.push(documentSnapshot.id);
                        listaChipsClasses = listaClasses.map((classe: any) =>
                            <Chip
                                color={Globais.corPrimaria}
                                key={classe} title={classe}
                                onPress={() => { setClasseSelec(classe) }}
                                containerStyle={{ marginHorizontal: 10, marginBottom: 20 }}>
                            </Chip>);
                    });
                    setChipsClasses(listaChipsClasses);
                    listaChipsClasses == '' ? setflagLoadClasses(false) : setflagLoadClasses(true)
                }).catch((erro) => {
                    console.error(erro);
                })
        }
        data()
    }, [periodoSelec, chipsClasses]);

    const renderCarregamento = () => {
        if (periodoSelec != '') {
            if (flagLoadClasses) {
                return (
                    <View
                        style={styles.contentView}>
                        {chipsClasses}
                    </View>
                )
            } else {
                return (
                    <View>
                        <Text style={styles.textLoad}>Carregando...</Text>
                    </View>
                )
            }
        }

    }

    return (
        <View >
            <ScrollView horizontal={true}>
                {renderCarregamento()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contentView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    textLoad: {
        fontSize: 24,
        color: Globais.corTextoClaro,
    }
});

export default ListaClassesChips;