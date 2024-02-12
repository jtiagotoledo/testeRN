import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, FlatList, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { Context } from "../data/Provider";
import Globais from '../data/Globais';

type ItemData = {
  nome: string;
  numero: string;
  frequencia: string;
  idAluno: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <View style={styles.containerItem}>
    <View style={[styles.item, styles.nome]}>
      <Text style={[styles.title]}>{item.numero} {item.nome}</Text>
    </View>
    <TouchableOpacity onPress={onPress} style={[styles.item, styles.frequencia
    ]}>
      <Text style={[styles.titleFrequencia]}>{item.frequencia}</Text>
    </TouchableOpacity>
  </View>

);

const FlatListFrequencia = () => {
  const alunos: any[] = []
  const [statusFreq, setStatusFreq] = useState('')
  const [selectedId, setSelectedId] = useState<string>();
  const { idPeriodoSelec, idClasseSelec, setNumAlunoSelec, recarregarFrequencia,
    dataSelec, flagLoadFrequencia, setFlagLoadFrequencia, setRecarregarFrequencia,
    listaFrequencia, setListaFrequencia, idUsuario, setRecarregarAlunos } = useContext(Context)

  useEffect(() => {
    const data = async () => {
      setListaFrequencia([{ numero: '', nome: '', frequencia: '', idAluno: '' }]);
      setRecarregarFrequencia('');
      setFlagLoadFrequencia('carregando');
      firestore().collection(idUsuario)
        .doc(idPeriodoSelec).collection('Classes')
        .doc(idClasseSelec).collection('Frequencia')
        .doc(dataSelec).collection('Alunos')
        .orderBy('numero')
        .get().then(snapshot => {
          if (snapshot.empty) {
            setFlagLoadFrequencia('vazio');
          } else {
            snapshot.forEach((documentSnapshot, index) => {
              alunos.push(documentSnapshot.data());
              if (snapshot.size - index == 1) {
                setFlagLoadFrequencia('carregado');
              }
            });
          }
        });
      setListaFrequencia(alunos)
    }
    data()
  }, [idClasseSelec, dataSelec, recarregarFrequencia]);

  const onPressItemFreq = (item: any) => {
    let statusFrequencia = item.frequencia == 'P' ? 'A' : 'P'
    setStatusFreq(item.frequencia)
    listaFrequencia[parseInt(item.numero) - 1].frequencia = statusFrequencia
    const idAluno = item.idAluno;
    setSelectedId(item.idAluno);
    setNumAlunoSelec(item.numero.toString());
    firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .doc(idClasseSelec).collection('Frequencia')
      .doc(dataSelec).collection('Alunos')
      .doc(idAluno).update({
        numero: item.numero,
        nome: item.nome,
        frequencia: statusFrequencia
      });
    setRecarregarAlunos('recarregar')
  }

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.numero === selectedId ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.numero === selectedId ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => onPressItemFreq(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderCarregamento = () => {
    if (idClasseSelec != '') {
      if (dataSelec != '') {
        switch (flagLoadFrequencia) {
          case 'vazio':
            return (
              <View>
                <Text style={styles.textLoad}>Adicione os alunos...</Text>
              </View>
            )
          case 'carregando':
            return (
              <View>
                <Text style={styles.textLoad}>Carregando...</Text>
              </View>
            )
          case 'carregado':
            return (
              <FlatList
                data={listaFrequencia}
                renderItem={renderItem}
                keyExtractor={item => item.idAluno}
                contentContainerStyle={{ paddingBottom: 120 }}
                extraData={selectedId}
              />
            )
        }
      } else {
        return (
          <View>
            <Text style={styles.textLoad}>Selecione uma data...</Text>
          </View>
        )
      }
    } else {
      return (
        <View>
          <Text style={styles.textLoad}>Selecione uma Classe...</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderCarregamento()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16
  },
  containerItem: {
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: Globais.corTerciaria,
  },
  title: {
    fontSize: 24,
  },
  titleFrequencia: {
    fontSize: 24,
    textAlign: 'center',
  },
  nome: {
    flex: 3
  },
  frequencia: {
    flex: 1
  },
  textLoad: {
    fontSize: 24,
    color: Globais.corTextoClaro,
  }
});

export default FlatListFrequencia;