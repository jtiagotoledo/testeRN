import React, {createContext, useState} from "react";
import auth from '@react-native-firebase/auth';

export const Context = createContext();

export default function Provider ({children}){

    const[email,setEmail]=useState('');
    const[idUsuario,setIdUsuario]=useState(auth().currentUser?.email);
    const[senha,setSenha]=useState('');
    const[modalPeriodo,setModalPeriodo]=useState(false);
    const[modalClasse,setModalClasse]=useState(false);
    const[modalAluno,setModalAluno]=useState(false);
    const[modalMenu,setModalMenu]=useState(false);
    const[modalDelAluno,setModalDelAluno]=useState(false);
    const[modalDelClasse,setModalDelClasse]=useState(false);
    const[modalCalendarioFreq,setModalCalendarioFreq]=useState(false);
    const[modalCalendarioNota,setModalCalendarioNota]=useState(false);
    const[flagLoadClasses,setflagLoadClasses]=useState('');
    const[flagLoadAlunos,setflagLoadAlunos]=useState('');
    const[flagLoadFrequencia,setFlagLoadFrequencia]=useState('');
    const[flagLoadNotas,setFlagLoadNotas]=useState('');
    const[flagLoadCalendarioFreq,setflagLoadCalendarioFreq]=useState('');
    const[flagLoadCalendarioNotas,setflagLoadCalendarioNotas]=useState('');
    const[flagLongPressClasse,setFlagLongPressClasse]=useState(false);
    const[flagLongPressAluno,setFlagLongPressAluno]=useState(false);
    const[recarregarAlunos,setRecarregarAlunos]=useState('');
    const[recarregarClasses,setRecarregarClasses]=useState('');
    const[recarregarFrequencia,setRecarregarFrequencia]=useState('');
    const[recarregarNotas,setRecarregarNotas]=useState('');
    const[recarregarCalendarioFreq,setRecarregarCalendarioFreq]=useState('');
    const[recarregarCalendarioNotas,setRecarregarCalendarioNotas]=useState('');
    const[periodoSelec,setPeriodoSelec]=useState('');
    const[classeSelec,setClasseSelec]=useState('');
    const[numAlunoSelec,setNumAlunoSelec]=useState('');
    const[dataSelec,setDataSelec]=useState('');
    const[listaClasses,setListaClasses]=useState([{classe:''}]);
    const[listaAlunos,setListaAlunos]=useState([{numero:'',nome:''}]);
    const[listaFrequencia,setListaFrequencia]=useState([{numero:'',nome:'',frequencia:''}]);
    const[listaNotas,setListaNotas]=useState([{numero:'',nome:'',nota:''}]);
    const[listaDatasFreq,setListaDatasFreq]=useState('');
    const[listaDatasNotas,setListaDatasNotas]=useState('');
    const[listaDatasMarcadasFreq,setListaDatasMarcadasFreq]=useState({});
    const[listaDatasMarcadasNotas,setListaDatasMarcadasNotas]=useState({});
    const[valueAtividade,setValueAtividade]=useState([{atividade:''}]);
    const[valueNota,setValueNota]=useState([{nota:''}]);

    return(
        <Context.Provider value={{
            email,setEmail,
            senha,setSenha,
            idUsuario,setIdUsuario,
            modalPeriodo,setModalPeriodo,
            modalClasse,setModalClasse,
            modalAluno,setModalAluno,
            modalMenu,setModalMenu,
            modalDelAluno,setModalDelAluno,
            modalDelClasse,setModalDelClasse,
            modalCalendarioFreq,setModalCalendarioFreq,
            modalCalendarioNota,setModalCalendarioNota,
            flagLoadClasses,setflagLoadClasses,
            flagLoadAlunos,setflagLoadAlunos,
            flagLoadFrequencia,setFlagLoadFrequencia,
            flagLoadNotas,setFlagLoadNotas,
            flagLoadCalendarioFreq,setflagLoadCalendarioFreq,
            flagLoadCalendarioNotas,setflagLoadCalendarioNotas,
            flagLongPressClasse,setFlagLongPressClasse,
            flagLongPressAluno,setFlagLongPressAluno,
            recarregarAlunos,setRecarregarAlunos,
            recarregarClasses,setRecarregarClasses,
            recarregarFrequencia,setRecarregarFrequencia,
            recarregarNotas,setRecarregarNotas,
            recarregarCalendarioFreq,setRecarregarCalendarioFreq,
            recarregarCalendarioNotas,setRecarregarCalendarioNotas,
            periodoSelec,setPeriodoSelec,
            classeSelec,setClasseSelec,
            numAlunoSelec,setNumAlunoSelec,
            dataSelec,setDataSelec,
            listaClasses,setListaClasses,
            listaAlunos,setListaAlunos,
            listaFrequencia,setListaFrequencia,
            listaNotas,setListaNotas,
            listaDatasNotas,setListaDatasNotas,
            listaDatasFreq,setListaDatasFreq,
            listaDatasMarcadasFreq,setListaDatasMarcadasFreq,
            listaDatasMarcadasNotas,setListaDatasMarcadasNotas,
            valueAtividade,setValueAtividade,
            valueNota,setValueNota}}>
            {children}
        </Context.Provider>
    )

}