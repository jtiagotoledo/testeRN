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
  media: string;
  porcentFreq: string;
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
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: textColor }]}>{item.numero}      </Text>
      </View>
      <View style={{ flex: 15 }}>
        <Text style={[styles.title, { color: textColor }]}>{item.nome}</Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <Text>Média: {item.media || ' ...'}</Text>
      <Text>%Freq: {item.porcentFreq || ' ...'}</Text>
    </View>
  </TouchableOpacity>
);

const FlatListAlunos = () => {
  const alunos: any[] = []
  const { flagLoadAlunos, setflagLoadAlunos, idPeriodoSelec, idClasseSelec,
    setNumAlunoSelec, setRecarregarAlunos, recarregarAlunos, setFlagLongPressClasse,
    listaAlunos, setListaAlunos, idUsuario, setFlagLongPressAluno,
    selectedIdAluno, setSelectedIdAluno, setNomeAlunoSelec, setIdAlunoSelec, setAlunoInativo } = useContext(Context)

  let listaAlunosRef = firestore().collection(idUsuario)
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('ListaAlunos')

  useEffect(() => {
    const data = async () => {
      setListaAlunos('');
      setRecarregarAlunos('');
      setflagLoadAlunos('carregando');
      listaAlunosRef.orderBy('numero')
        .onSnapshot((snapshot) => {
          if (snapshot.empty && idClasseSelec != '') {
            setflagLoadAlunos('vazio');
          } else {
            snapshot.forEach((docSnapshot, index) => {
              if (snapshot.size - index == 1) {
                setflagLoadAlunos('carregado');
              }

              //recuperação das datas de frequencia e cálculo da porcentagem de frequência
              let contFreq = 0
              let porcentFreq
              let frequencias = docSnapshot.data().frequencias
              if(Object.keys(frequencias).length>0){
                let qntDatas = Object.keys(frequencias).length
                frequencias.forEach((item:any)=>{
                  item.freq=='P' ? contFreq+=1 : null
                })
                porcentFreq = ((contFreq*100)/qntDatas).toFixed(1)
              }else{
                porcentFreq = 0
              }

              alunos.push(docSnapshot.data(),{porcentFreq})
              console.log('alunos',alunos);
              

              /* // recuperação de notas para a média
              let id = docSnapshot.data().idAluno
              let notas: number[] = []
              let mediaNotas = ''
              let somaNotas = 0
              firestore().collection(idUsuario)
                .doc(idPeriodoSelec).collection('Classes')
                .doc(idClasseSelec).collection('Notas')
                .onSnapshot((snapshot) => {
                  snapshot.forEach((docSnapshot, index) => {
                    docSnapshot.ref.collection('Alunos')
                      .doc(id)
                      .onSnapshot((snapshot2) => {
                        let nota = snapshot2.data()?.nota == '' ? '0' : snapshot2.data()?.nota
                        notas.push(parseFloat(nota))
                        somaNotas = notas.reduce((a, b) => a + b, 0)
                        mediaNotas = (somaNotas / notas.length).toFixed(1)
                      })
                  })
                })

              // recuperação da frequencia para percentual de freq.
              let frequencias: string[] = []
              let porcentFreq = '0'
              let contFreq = 0
              firestore().collection(idUsuario)
                .doc(idPeriodoSelec).collection('Classes')
                .doc(idClasseSelec).collection('Frequencia')
                .onSnapshot((snapshot) => {
                  let tamArrDatas = snapshot.size
                  snapshot.forEach((docSnapshot, index) => {
                    docSnapshot.ref.collection('Alunos')
                      .doc(id)
                      .onSnapshot((snapshot2) => {
                        let freq = snapshot2.data()?.frequencia
                        freq == 'P' ? frequencias.push(freq) : null
                        contFreq = frequencias.length
                        porcentFreq = (contFreq * 100 / tamArrDatas).toFixed(1)
                        if (snapshot.size - index == 1) {
                          setTimeout(() => {
                            fnMediaFreq(mediaNotas, porcentFreq)
                          }, 50)
                        }
                      })
                  })
                })

              const fnMediaFreq = (mediaNotas: any, porcentFreq: any) => {
                alunos.push(docSnapshot.data());
                let objIndex = alunos.findIndex(obj => obj.idAluno === id)
                if (objIndex != -1) {
                  alunos[objIndex].media = !isNaN(mediaNotas) ? mediaNotas : 0
                  alunos[objIndex].porcentFreq = porcentFreq
                }
                setListaAlunos(alunos)
              } */

            })
            setListaAlunos(alunos)
          }
        });


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

export default FlatListAlunos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 8,
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

