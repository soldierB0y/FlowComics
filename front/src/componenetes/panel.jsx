import { useNavigate } from "react-router-dom";
import { useUser } from "./userGlobal"
import { useEffect, useState } from "react";






export const Panel= ()=>{
    const inputStyle='bg-white border w-full py-2 rounded-lg pl-3';

    const {userInfo}= useUser();
    const [productos,setProductos]=useState({titulo:null,autor:null,precioVenta:null,precioOferta:null,costoProduccion:null,categorias:null,ancho:null,alto:null,paginas:null,cantidad:null,img:null})
    const[modal,setModal]= useState('hidden');
    const[errCampos, setErrCampos]= useState('hidden');
    const navigator= useNavigate();   
    useEffect(()=>{
        if(userInfo.rol!='admin')
            navigator('/');
    },[userInfo])

    return(
        <section className="w-screen flex items-center justify-center">
            <div className={"absolute max-h-100  top-28 w-90 overflow-scroll rounded-xl min-h-50 p-5 bg-white items-center justify-start border flex-col gap-2 "+modal}>
                <h1>Nuevo Producto</h1>
                <input onClick={(e)=>{setProductos({...productos,titulo:e.target.value})}} className={inputStyle} type='text' placeholder="titulo"/>
                <input onClick={(e)=>{setProductos({...productos,autor:e.target.value})}} className={inputStyle} type='text' placeholder="autor"/>
                <input onClick={(e)=>{setProductos({...productos,precioVenta:e.target.value})}} className={inputStyle} type='number' placeholder="precio de venta"/>
                <input onClick={(e)=>{setProductos({...productos,precioOferta:e.target.value})}} className={inputStyle} type='number' placeholder="precio de oferta"/>
                <input onClick={(e)=>{setProductos({...productos,costoProduccion:e.target.value})}} className={inputStyle} type='number' placeholder="costo produccion"/>
                <input onClick={(e)=>{setProductos({...productos,categorias:e.target.value})}} className={inputStyle} type='text' placeholder="categorias"/>
                <input onClick={(e)=>{setProductos({...productos,ancho:e.target.value})}} className={inputStyle} type='number' placeholder="ancho"/>
                <input onClick={(e)=>{setProductos({...productos,alto:e.target.value})}} className={inputStyle} type='number' placeholder="alto"/>
                <input onClick={(e)=>{setProductos({...productos,paginas:e.target.value})}} className={inputStyle} type='number' placeholder="paginas"/>
                <input onClick={(e)=>{setProductos({...productos,cantidad:e.target.value})}} className={inputStyle} type='number' placeholder="cantidad"/>
                <input onClick={(e)=>{setProductos({...productos,img:e.target.value})}} className={inputStyle+''} type='file' placeholder="img"/>
                <p className={'text-red-500 '+errCampos}>Rellene los campos</p>
                <span className="flex flex-row justify-around w-full gap-2 py-3">
                    <input  className="bg-slate-500 flex-1 text-white rounded-md py-1 hover:bg-slate-400 hover:cursor-pointer" type='button' value={'Registrar'}
                        onClick={()=>{
                            var varVoid= false;
                            const objProducto= Object.keys(productos);
                            for(let i=0;i< objProducto.length;i++)
                            {
                                if (productos[objProducto[i]] == null || productos[objProducto[i]] === '')
                                {
                                    setErrCampos('block')
                                    console.log('AAA');
                                    varVoid=true;
                                    break;
                                }            
                            }
                            if(!varVoid)
                                setErrCampos('hidden');
                                console.log(productos);

                        }}
                    />
                    <button className="bg-red-400 flex-1 text-white rounded-md py-1 hover:bg-red-300 hover:cursor-pointer"
                        onClick={()=>{
                            setModal('hidden')
                        }}
                    >atras</button>
                </span>


            </div>
            <section className=" w-full min-h-50 bg-white flex items-center justify-start p-5 flex-col gap-5">
                <h1>Panel</h1>
                <div className="bg-slate-100 rounded-3xl flex flex-col items-center p-5 w-full">
                    <div className="flex w-full justify-center py-5">
                        <span className="bg-red-400 px-13 py-3 rounded-xl hover:cursor-pointer hover:bg-red-300">
                            <h3 className="text-white">Mis Productos</h3>
                        </span>
                    </div>
                </div>
                <div className="bg-slate-100 rounded-3xl flex flex-col items-center p-5 w-full">
                    <div className="flex w-full justify-center py-5 flex-col justify-center, items-center">
                        <h2>Productos</h2>
                        <button className="bg-red-400 hover:bg-red-300 hover:cursor-pointer text-white w-40 py-2 rounded-xl"
                            onClick={()=>{
                                setModal('flex')
                            }}
                        >Agregar</button>
                    </div>
                </div>
            </section>
        </section>
    )
}