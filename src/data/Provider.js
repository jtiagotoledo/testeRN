import React, {createContext, useState} from "react";
import auth from '@react-native-firebase/auth';

export const Context = createContext();

export default function Provider ({children}){

    const[email,setEmail]=useState('');
    const[idUsuario,setIdUsuario]=useState(auth().currentUser?.email);
    const[senha,setSenha]=useState('');
    const[modalAddPeriodo,setModalAddPeriodo]=useState(false);
    const[modalAddClasse,setModalAddClasse]=useState(false);
    const[modalAddAluno,setModalAddAluno]=useState(false);
    const[modalEditPeriodo,setModalEditPeriodo]=useState(false);
    const[modalEditClasse,setModalEditClasse]=useState(false);
    const[modalEditAluno,setModalEditAluno]=useState(false);
    const[modalDelPeriodo,setModalDelPeriodo]=useState(false);
    const[modalDelClasse,setModalDelClasse]=useState(false);
    const[modalDelAluno,setModalDelAluno]=useState(false);
    const[modalCalendarioFreq,setModalCalendarioFreq]=useState(false);
    const[modalCalendarioNota,setModalCalendarioNota]=useState(false);
    const[modalMenu,setModalMenu]=useState(false);
    const[flagLoadClasses,setflagLoadClasses]=useState('');
    const[flagLoadAlunos,setflagLoadAlunos]=useState('');
    const[flagLoadFrequencia,setFlagLoadFrequencia]=useState('');
    const[flagLoadNotas,setFlagLoadNotas]=useState('');
    const[flagLoadCalendarioFreq,setflagLoadCalendarioFreq]=useState('');
    const[flagLoadCalendarioNotas,setflagLoadCalendarioNotas]=useState('');
    const[flagLongPressClasse,setFlagLongPressClasse]=useState(false);
    const[flagLongPressAluno,setFlagLongPressAluno]=useState(false);
    const[recarregarPeriodo,setRecarregarPeriodo]=useState('');
    const[recarregarClasses,setRecarregarClasses]=useState('');
    const[recarregarAlunos,setRecarregarAlunos]=useState('');
    const[recarregarFrequencia,setRecarregarFrequencia]=useState('');
    const[recarregarNotas,setRecarregarNotas]=useState('');
    const[recarregarCalendarioFreq,setRecarregarCalendarioFreq]=useState('');
    const[recarregarCalendarioNotas,setRecarregarCalendarioNotas]=useState('');
    const[idPeriodoSelec,setIdPeriodoSelec]=useState('');
    const[nomePeriodoSelec,setNomePeriodoSelec]=useState('');
    const[idClasseSelec,setIdClasseSelec]=useState('');
    const[nomeClasseSelec,setNomeClasseSelec]=useState('');
    const[numAlunoSelec,setNumAlunoSelec]=useState('');
    const[nomeAlunoSelec,setNomeAlunoSelec]=useState('');
    const[selectedIdAluno, setSelectedIdAluno]=useState('');
    const[dataSelec,setDataSelec]=useState('');
    const[listaPeriodos,setListaPeriodos] = useState([{label:'',value:'',periodo:'',idPeriodo:''}]);
    const[listaClasses,setListaClasses]=useState([{classe:'',idClasse:''}]);
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
            modalAddPeriodo,setModalAddPeriodo,
            modalAddClasse,setModalAddClasse,
            modalAddAluno,setModalAddAluno,
            modalEditPeriodo,setModalEditPeriodo,
            modalEditClasse,setModalEditClasse,
            modalEditAluno,setModalEditAluno,
            modalDelPeriodo,setModalDelPeriodo,
            modalDelClasse,setModalDelClasse,
            modalDelAluno,setModalDelAluno,
            modalCalendarioFreq,setModalCalendarioFreq,
            modalCalendarioNota,setModalCalendarioNota,
            modalMenu,setModalMenu,
            flagLoadClasses,setflagLoadClasses,
            flagLoadAlunos,setflagLoadAlunos,
            flagLoadFrequencia,setFlagLoadFrequencia,
            flagLoadNotas,setFlagLoadNotas,
            flagLoadCalendarioFreq,setflagLoadCalendarioFreq,
            flagLoadCalendarioNotas,setflagLoadCalendarioNotas,
            flagLongPressClasse,setFlagLongPressClasse,
            flagLongPressAluno,setFlagLongPressAluno,
            recarregarPeriodo,setRecarregarPeriodo,
            recarregarClasses,setRecarregarClasses,
            recarregarAlunos,setRecarregarAlunos,
            recarregarFrequencia,setRecarregarFrequencia,
            recarregarNotas,setRecarregarNotas,
            recarregarCalendarioFreq,setRecarregarCalendarioFreq,
            recarregarCalendarioNotas,setRecarregarCalendarioNotas,
            idPeriodoSelec,setIdPeriodoSelec,
            nomePeriodoSelec,setNomePeriodoSelec,
            idClasseSelec,setIdClasseSelec,
            nomeClasseSelec,setNomeClasseSelec,
            numAlunoSelec,setNumAlunoSelec,
            nomeAlunoSelec,setNomeAlunoSelec,
            selectedIdAluno, setSelectedIdAluno,
            dataSelec,setDataSelec,
            listaPeriodos,setListaPeriodos,
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