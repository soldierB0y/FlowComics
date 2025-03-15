import { createContext,useContext,useState } from "react";

//para usar el hook
const urlContext= createContext();

//Con esta linea se accede al contexto desde los componentes hijos
export const UseUrl=()=>{
    return(
        useContext(urlContext)
    )
}
//Este es el componente padre que envolvera toda la api para que los hijos tengan el contexto
export const UrlProvider=({children})=>{
    const [url,setUrl]=useState('http://localhost:3000/');
    return(
        <urlContext.Provider value={{url,setUrl}}>
            {children}
        </urlContext.Provider>
    )
}