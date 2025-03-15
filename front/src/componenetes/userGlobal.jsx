import { createContext,useContext, useState } from "react";


const userContext= createContext();

//funcion publica para llamar al usuario
export const useUser=()=>
{
    return (
        useContext(userContext)
    )
}

export const UserProvider=({children})=>{
    const [userInfo,setUserinfo]= useState({});
    return(
        <userContext.Provider value={{userInfo,setUserinfo}}>
            {children}
        </userContext.Provider>
    )
}