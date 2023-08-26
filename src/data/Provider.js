import React, {createContext, useState} from "react";

export const Context = createContext();

export default function Provider ({children}){

    const[ativarModal,setAtivarModal]=useState(false);
    const[periodoSelec,setPeriodoSelec]=useState('');

    return(
        <Context.Provider value={{ativarModal,setAtivarModal,
            periodoSelec,setPeriodoSelec}}>
            {children}
        </Context.Provider>
    )

}