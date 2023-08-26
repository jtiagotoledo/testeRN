import React, {createContext, useState} from "react";

export const Context = createContext();

export default function Provider ({children}){

    const[modalPeriodo,setModalPeriodo]=useState(false);
    const[modalClasse,setModalClasse]=useState(false);
    const[periodoSelec,setPeriodoSelec]=useState('');

    return(
        <Context.Provider value={{modalPeriodo,setModalPeriodo,
            modalClasse,setModalClasse,
            periodoSelec,setPeriodoSelec}}>
            {children}
        </Context.Provider>
    )

}