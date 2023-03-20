import React, {useContext, useState} from "react";

const ModelContext = React.createContext();

export function ModelLoader({children}){
    return(
        <ModelContext.Provider value={"Test"}>
            {children}
        </ModelContext.Provider>
    )
}