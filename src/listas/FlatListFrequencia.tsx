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
    <View style={[styles.item, styles.nome, {flexDirection:'row'}]}>
      <View style={{ flex: 1 , justifyContent:'center'}}>
        <Text style={[styles.title]}>{item.numero}</Text>
      </View>
      <View style={{ flex: 10, justifyContent:'center' }}>
        <Text style={[styles.title]}>{item.nome}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={[styles.item]}>
        <Text style={[styles.titleFrequencia]}>{item.frequencia}</Text>
      </TouchableOpacity>
    </View>
  </View>

);

const FlatListFrequencia = () => {
  const alunos: any[] = []
  const [selectedId, setSelectedId] = useState<string>();
  const { idPeriodoSelec, idClasseSelec, setNumAlunoSelec, recarregarFrequencia,
    dataSelec, flagLoadFrequencia, setFlagLoadFrequencia, setRecarregarFrequencia,
    listaFrequencia, setListaFrequencia, idUsuario, setRecarregarAlunos } = useContext(Context)

  let listaAlunosRef = firestore().collection(idUsuario)
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('ListaAlunos')

  useEffect(() => {
    setFlagLoadFrequencia('carregando')
    listaAlunosRef.orderBy('numero').get().then((snapshot) => {
      if (snapshot.empty) {
        setFlagLoadFrequencia('vazio');
      } else {
        //consulta ao BD retorna a lista de alunos com nome, num, freq e id
        snapshot.forEach((docSnapshot, index) => {
          let frequencias = docSnapshot.data().frequencias
          if (dataSelec != '') {
            let idx = frequencias.findIndex((item: any) => item.data == dataSelec)
            if (idx != -1) {
              let frequencia = frequencias[idx].freq
              alunos.push({ ...docSnapshot.data(), frequencia });
            }
          }
          if (snapshot.size - index == 1) {
            setFlagLoadFrequencia('carregado');
          }
        });
      }
    }).catch((erro) => {
      console.error(erro);
    })
    setListaFrequencia(alunos)
  }, [idClasseSelec, dataSelec, recarregarFrequencia]);

  const onPressItemFreq = (item: any) => {
    const idAluno = item.idAluno;
    const index = listaFrequencia.findIndex((el: any) => el.idAluno === idAluno);
    let statusFrequencia = item.frequencia == 'P' ? 'A' : 'P'
    listaFrequencia[index].frequencia = statusFrequencia
    setSelectedId(item.idAluno);
    setNumAlunoSelec(item.numero.toString());

    //consulta ao array de frequencias
    listaAlunosRef.doc(idAluno).get().then((docSnapshot) => {
      let datas = docSnapshot.data()?.frequencias
      //modificando o array
      datas.map((item: any) => {
        if (item.data == dataSelec) {
          item.freq = statusFrequencia
        }
      })
      //atualizando o BD com o novo array
      listaAlunosRef.doc(idAluno).update({
        frequencias: datas
      })
    }).catch((erro) => {
      console.error(erro);
    })

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
    marginTop: 8
  },
  containerItem: {
    flexDirection: 'row',
  },
  item: {
    padding: 4,
    marginVertical: 2,
    marginHorizontal: 8,
    backgroundColor: Globais.corTerciaria,
  },
  title: {
    fontSize: 20,
  },
  titleFrequencia: {
    fontSize: 20,
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