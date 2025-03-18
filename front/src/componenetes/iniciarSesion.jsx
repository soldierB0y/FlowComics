import { useEffect, useState } from "react"
import { UseUrl } from "./urlGlobal";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userGlobal";

var token= null;

async function validarInicioSesion(credenciales,url)
{
    const body= new URLSearchParams();
    body.append('username',credenciales.username);
    body.append('password',credenciales.password);
    const resultado= await fetch(url+'auth',{
        method:'POST',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:body
    })
    if (resultado.ok)
    {
        const data= await resultado.json();
         token= data.token; 
        return data.userData;
    }
    else 
        return false
}


export const InicioSesion= ()=>{
    const {userInfo,setUserinfo}= useUser();
    const {userToken,setUserToken}=useUser()
    const navigator= useNavigate();
    const {url}= UseUrl();
    const [errCampos,setErrCampos]=  useState('hidden');
    const [errCredenciales,setErrCredenciales]= useState('hidden');
    const [credenciales,setCredenciales]= useState({username:'',password:''});
    
    useEffect(()=>{
        setUserToken(token);
    },[userInfo])


    return(<>
        <section className="w-full h-screen bg-white flex items-start justify-center pt-10">
            <div className="text-black bg-slate-100 w-85 min-h-100 flex flex-col items-center rounded-3xl p-10 gap-5">
                <h1 className="font-semibold">Iniciar Sesion</h1>
                <input className="outline-sky-500 bg-white w-full h-10 pl-3 rounded-lg" type="text" placeholder="usuario"
                    onChange={(e)=>{
                        setCredenciales({...credenciales,username:e.target.value})
                        setErrCampos('hidden')
                    }}
                />
                <input className="outline-sky-500 bg-white w-full h-10 pl-3 rounded-lg" type="password" placeholder="clave"
                    onChange={(e)=>{
                        setCredenciales({...credenciales,password:e.target.value})
                        setErrCampos('hidden')
                    }}
                />
                <input className="bg-red-500 text-white w-full py-3 rounded-xl hover:cursor-pointer hover:bg-red-400" type="button" value='ingresar'
                    onClick={()=>{
                        if( !credenciales.username || !credenciales.password)
                            setErrCampos('block');
                        else
                        {
                            setErrCampos('hidden');
                            //console.log('Credenciales',credenciales);
                            (async ()=>{
                                const result= await validarInicioSesion(credenciales,url);
                                if (!result)
                                    setErrCredenciales('block')
                                else
                                {
                                    setUserinfo(result);
                                    navigator('/');
                                }
                            })() 
                        }
                    }}
                />
                <p className={"text-red-500 "+errCampos}>Rellene todos los campos</p>
                <p className={"text-red-500 "+errCredenciales}>Credenciales Invalidas</p>
                <p className="text-sky-600 hover:text-sky-500 hover:cursor-pointer">¿Has olvidado tu contraseña?</p>
                <p className="text-sky-600 hover:text-sky-500 hover:cursor-pointer">Registrate</p>
            </div>
        </section>
    </>)
}