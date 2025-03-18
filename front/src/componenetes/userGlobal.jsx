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
    const [userToken,setUserToken]=useState(null);
    return(
        <userContext.Provider value={{userInfo,setUserinfo,userToken,setUserToken}}>
            {children}
        </userContext.Provider>
    )
}