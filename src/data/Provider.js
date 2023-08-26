import React, {createContext, useState} from "react";

export const Context = createContext();

export default function Provider ({children}){

    const[ativarModal,setAtivarModal]=useState(false);

    return(
        <Context.Provider value={{ativarModal,setAtivarModal}}>
            {children}
        </Context.Provider>
    )

}