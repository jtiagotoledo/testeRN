import React, {createContext, useState} from "react";

export const Context = createContext();

export default function Provider ({children}){

    const[modalPeriodo,setModalPeriodo]=useState(false);
    const[modalClasse,setModalClasse]=useState(false);
    const[modalAluno,setModalAluno]=useState(false);
    const[modalDelAluno,setModalDelAluno]=useState(false);
    const[modalDelClasse,setModalDelClasse]=useState(false);
    const[modalCalendario,setModalCalendario]=useState(false);
    const[flagLoadClasses,setflagLoadClasses]=useState('');
    const[flagLoadAlunos,setflagLoadAlunos]=useState('');
    const[flagLoadFrequencia,setFlagLoadFrequencia]=useState('');
    const[flagLoadCalendarioFreq,setflagLoadCalendarioFreq]=useState('');
    const[flagLoadCalendarioNotas,setflagLoadCalendarioNotas]=useState('');
    const[recarregarAlunos,setRecarregarAlunos]=useState('');
    const[recarregarClasses,setRecarregarClasses]=useState('');
    const[recarregarFrequencia,setRecarregarFrequencia]=useState('');
    const[recarregarCalendario,setRecarregarCalendario]=useState('');
    const[periodoSelec,setPeriodoSelec]=useState('');
    const[classeSelec,setClasseSelec]=useState('');
    const[numAlunoSelec,setNumAlunoSelec]=useState('');
    const[dataSelec,setDataSelec]=useState('');
    const[listaClasses,setListaClasses]=useState([{classe:''}]);
    const[listaAlunos,setListaAlunos]=useState([{numero:'',nome:''}]);
    const[listaFrequencia,setListaFrequencia]=useState([{numero:'',nome:'',frequencia:''}]);
    const[listaDatasFreq,setListaDatasFreq]=useState('');
    const[listaDatasNotas,setListaDatasNotas]=useState('');
    const[listaDatasMarcadasFreq,setListaDatasMarcadasFreq]=useState({});
    const[listaDatasMarcadasNotas,setListaDatasMarcadasNotas]=useState({});
    const[valueAtividade,setValueAtividade]=useState([{atividade:''}]);
    const[valueNota,setValueNota]=useState([{nota:''}]);

    return(
        <Context.Provider value={{
            modalPeriodo,setModalPeriodo,
            modalClasse,setModalClasse,
            modalAluno,setModalAluno,
            modalDelAluno,setModalDelAluno,
            modalDelClasse,setModalDelClasse,
            modalCalendario,setModalCalendario,
            flagLoadClasses,setflagLoadClasses,
            flagLoadAlunos,setflagLoadAlunos,
            flagLoadFrequencia,setFlagLoadFrequencia,
            flagLoadCalendarioFreq,setflagLoadCalendarioFreq,
            flagLoadCalendarioNotas,setflagLoadCalendarioNotas,
            recarregarAlunos,setRecarregarAlunos,
            recarregarClasses,setRecarregarClasses,
            recarregarFrequencia,setRecarregarFrequencia,
            recarregarCalendario,setRecarregarCalendario,
            periodoSelec,setPeriodoSelec,
            classeSelec,setClasseSelec,
            numAlunoSelec,setNumAlunoSelec,
            dataSelec,setDataSelec,
            listaClasses,setListaClasses,
            listaAlunos,setListaAlunos,
            listaFrequencia,setListaFrequencia,
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