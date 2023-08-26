import React, {createContext, useState} from "react";

export const Context = createContext();

export default function Provider ({children}){

    const[modalPeriodo,setmodalPeriodo]=useState(false);
    const[periodoSelec,setPeriodoSelec]=useState('');

    return(
        <Context.Provider value={{modalPeriodo,setmodalPeriodo,
            periodoSelec,setPeriodoSelec}}>
            {children}
        </Context.Provider>
    )

}