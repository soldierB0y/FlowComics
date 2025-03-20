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
    const [carritoItems, setCarritoItems]= useState([]);
    const [carritoVisible, setCarritoVisible]= useState('hidden');

    return(
        <userContext.Provider value={{userInfo,setUserinfo,userToken,setUserToken,carritoItems,setCarritoItems,carritoVisible,setCarritoVisible}}>
            {children}
        </userContext.Provider>
    )
}