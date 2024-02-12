import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { Context } from "../data/Provider";
import Globais from '../data/Globais';

type ItemData = {
  nome: string;
  numero: string;
  inativo: string;
  idAluno: string;
  media: string
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  onLongPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, onLongPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item.numero} {item.nome}      média: {item.media || '...'}</Text>
  </TouchableOpacity>
);

const FlatListAlunos = () => {
  const alunos: any[] = []
  const { flagLoadAlunos, setflagLoadAlunos, idPeriodoSelec, idClasseSelec,
    setNumAlunoSelec, setRecarregarAlunos, recarregarAlunos, setFlagLongPressClasse,
    listaAlunos, setListaAlunos, idUsuario, setFlagLongPressAluno,
    selectedIdAluno, setSelectedIdAluno, setNomeAlunoSelec, setIdAlunoSelec, setAlunoInativo } = useContext(Context)

  useEffect(() => {
    const data = async () => {
      setListaAlunos('');
      setRecarregarAlunos('');
      setflagLoadAlunos('carregando');
      firestore().collection(idUsuario)
        .doc(idPeriodoSelec).collection('Classes')
        .doc(idClasseSelec).collection('ListaAlunos')
        .orderBy('numero')
        .onSnapshot((snapshot) => {
          if (snapshot.empty && idClasseSelec != '') {
            setflagLoadAlunos('vazio');
          } else {
            snapshot.forEach((documentSnapshot, index) => {

              if (snapshot.size - index == 1) {
                setflagLoadAlunos('carregado');
              }

              // recuperação de notas para a média
              let id = documentSnapshot.data().idAluno
              let notas: number[] = []
              let mediaNotas = 0
              let somaNotas = 0
              firestore().collection(idUsuario)
                .doc(idPeriodoSelec).collection('Classes')
                .doc(idClasseSelec).collection('Notas')
                .onSnapshot((snapshot) => {
                  if (snapshot.empty) {
                    alunos.push(documentSnapshot.data());
                  }
                  snapshot.forEach((docSnapshot, index) => {
                    docSnapshot.ref.collection('Alunos')
                      .doc(id)
                      .onSnapshot((snapshot) => {
                        let nota = snapshot.data()?.nota == '' ? '0' : snapshot.data()?.nota
                        notas.push(parseFloat(nota))
                        somaNotas = notas.reduce((a, b) => a + b, 0)
                        mediaNotas = (somaNotas / notas.length)
                        let mediaFormat = mediaNotas.toFixed(1)
                        fnMedia(mediaFormat)
                      })
                    const fnMedia = (mediaNotas: any) => {
                      if (snapshot.size - index == 1) {
                        alunos.push(documentSnapshot.data());
                        let objIndex = alunos.findIndex(obj => obj.idAluno === id)
                        if (objIndex != -1) {
                          alunos[objIndex].media = !isNaN(mediaNotas) ? mediaNotas : 0
                        }
                      }
                    }
                  })
                })

              // recuperação de notas para a frequencia
              let frequencias: string[] = []
              let porcentFreq = 0
              let contFreq = 0
              firestore().collection(idUsuario)
                .doc(idPeriodoSelec).collection('Classes')
                .doc(idClasseSelec).collection('Frequencia')
                .onSnapshot((snapshot) => {
                  /* if (snapshot.empty) {
                    alunos.push(documentSnapshot.data());
                  } */
                  let tamArrDatas = snapshot.size
                  snapshot.forEach((docSnapshot) => {
                    docSnapshot.ref.collection('Alunos')
                      .doc(id)
                      .onSnapshot((snapshot) => {
                        let freq = snapshot.data()?.frequencia
                        freq == 'P' ? frequencias.push(freq) : null
                        contFreq = frequencias.length
                        porcentFreq = (contFreq/tamArrDatas)
                        console.log('porcentFreq',porcentFreq);
                      })

                  })
                })

            });
          }
        });
      setListaAlunos(alunos)
    }
    data()
  }, [idPeriodoSelec, idClasseSelec, recarregarAlunos]);

  const onPressItem = (item: any) => {
    setSelectedIdAluno(item.idAluno)
    setIdAlunoSelec(item.idAluno)
    setNomeAlunoSelec(item.nome)
    setNumAlunoSelec(item.numero.toString())
    setFlagLongPressAluno(false)
  }

  const onLongPressItem = (item: any) => {
    setSelectedIdAluno(item.idAluno)
    setIdAlunoSelec(item.idAluno)
    setNomeAlunoSelec(item.nome)
    setNumAlunoSelec(item.numero.toString())
    setAlunoInativo(item.inativo)
    setFlagLongPressAluno(true)
    setFlagLongPressClasse(false)
  }

  const renderItem = ({ item }: { item: ItemData }) => {
    let backgroundColor = ''
    if (item.inativo) {
      backgroundColor = Globais.corAlunoInativo
    } else {
      backgroundColor = item.idAluno === selectedIdAluno ? Globais.corPrimaria : Globais.corTerciaria;
    }
    const color = item.idAluno === selectedIdAluno ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => onPressItem(item)}
        onLongPress={() => onLongPressItem(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderCarregamento = () => {
    if (idClasseSelec != '') {
      switch (flagLoadAlunos) {
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
              data={listaAlunos}
              renderItem={renderItem}
              keyExtractor={item => item.idAluno}
              extraData={selectedIdAluno}
            />
          )
      }
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
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
  },
  textLoad: {
    fontSize: 24,
    color: Globais.corTextoClaro,
  }
});

export default FlatListAlunos;