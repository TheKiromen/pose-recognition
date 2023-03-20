import React, {useContext, useState} from "react";

export const ModelContext = React.createContext(null);

// export function ModelLoader({children}){
//     return(
//         <ModelContext.Provider value={"Test"}>
//             {children}
//         </ModelContext.Provider>
//     )
// }