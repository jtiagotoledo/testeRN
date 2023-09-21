import React, {createContext, useState} from "react";

export const Context = createContext();

export default function Provider ({children}){

    const[modalPeriodo,setModalPeriodo]=useState(false);
    const[modalClasse,setModalClasse]=useState(false);
    const[modalAluno,setModalAluno]=useState(false);
    const[modalDelAluno,setModalDelAluno]=useState(false);
    const[modalCalendario,setModalCalendario]=useState(false);
    const[flagLoadClasses,setflagLoadClasses]=useState(false);
    const[periodoSelec,setPeriodoSelec]=useState('');
    const[classeSelec,setClasseSelec]=useState('');
    const[numAlunoSelec,setNumAlunoSelec]=useState('');
    const[dataSelec,setDataSelec]=useState('');

    return(
        <Context.Provider value={{
            modalPeriodo,setModalPeriodo,
            modalClasse,setModalClasse,
            modalAluno,setModalAluno,
            modalDelAluno,setModalDelAluno,
            modalCalendario,setModalCalendario,
            flagLoadClasses,setflagLoadClasses,
            periodoSelec,setPeriodoSelec,
            classeSelec,setClasseSelec,
            numAlunoSelec,setNumAlunoSelec,
            dataSelec,setDataSelec}}>
            {children}
        </Context.Provider>
    )

}