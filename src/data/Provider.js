import React, {createContext, useState} from "react";

export const Context = createContext();

export default function Provider ({children}){

    const[modalPeriodo,setModalPeriodo]=useState(false);
    const[modalClasse,setModalClasse]=useState(false);
    const[modalAluno,setModalAluno]=useState(false);
    const[periodoSelec,setPeriodoSelec]=useState('');
    const[classeSelec,setClasseSelec]=useState('');

    return(
        <Context.Provider value={{
            modalPeriodo,setModalPeriodo,
            modalClasse,setModalClasse,
            modalAluno,setModalAluno,
            periodoSelec,setPeriodoSelec,
            classeSelec,setClasseSelec}}>
            {children}
        </Context.Provider>
    )

}