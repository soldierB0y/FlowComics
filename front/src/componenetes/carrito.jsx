import { useState } from "react"
import close from '../assets/imgs/close.png'
import { useUser } from "./userGlobal"
import cartEmpty from '../assets/imgs/cartEmpty.png'


export const Carrito= ()=>{

   const {carritoItems,setCarritoItems}=useUser();
   const {carritoVisible,setCarritoVisible}=useUser();


    

    return(

        <section className={"w-full  absolute flex flex-col items-center p-5 z-1000 "+carritoVisible}>
            {
            carritoItems.lenght > 0?
            <div className={"w-full bg-white border rounded-3xl min-h-100 flex p-5 flex-col max-w-150 "}>
                <span className="w-full flex flex-row justify-between">
                    <b>
                        <h3>Mi Lista</h3>                        
                    </b>
                    <img className={"w-5 h-5 hover:cursor-pointer"} src={close}
                        onClick={()=>{
                            if(carritoVisible != 'flex')
                            {
                                setCarritoVisible('flex')
                            }
                            else
                            {
                                setCarritoVisible('hidden');  
                            }
                        }}
                    ></img>
                </span>
                <span className="flex flex-col w-full g-2 py-2 gap-1">
                    {
                        carritoItems.map((item,index)=>(
                            <span className="w-full min-h-18 px-5 rounded-xl flex flex-row bg-slate-100" key={index}>
                                    <span className="w-[50%] flex flex-col">
                                        <h4><b>Titulo</b> {item.titulo}</h4>
                                        <h4><b>cantidad</b> {item.cantidad}</h4>
                                    </span>
                                    <span className="flex-1  items-center flex-row justify-center gap-2 flex">
                                        <i className=" w-5 h-5 text-white flex justify-center items-center rounded-md bg-red-500 hover:cursor-pointer"
                                            onClick={()=>{

                                                setCarritoItems(prev=>
                                                    prev.map((item,i)=>
                                                        i===index && item.cantidad > 0?
                                                        {...item, cantidad: item.cantidad -1}: item
                                                    )
                                                )
                                            }}
                                        >-</i>
                                        <h4>{item.cantidad}</h4>
                                        <i className=" w-5 h-5 text-white flex justify-center items-center rounded-md bg-sky-400 hover:cursor-pointer"
                                            onClick={()=>{
                                                setCarritoItems(prev=>
                                                    prev.map((item,i)=> i===index? {...item, cantidad: Number(item.cantidad) +1}:item)
                                                )
                                            }}
                                        >+</i>
                                    </span>
                                
                                
                            </span>
                            
                        ))
                    }
                    <button className="bg-red-500 text-white w-50 h-10 rounded-lg mt-5 outline-none self-end hover:cursor-pointer">Pagar</button>
                </span>
            </div>:
            <div className="w-full bg-white border rounded-3xl min-h-100 flex p-3 flex-col max-w-150 gap-5">
                <h1 className="text-center"><b>Vacio</b></h1>
                <span className="w-full py-10 flex items-center justify-center bg-slate-100 rounded-xl">
                    <img className="w-[50%] h-[50%] invert-80 " src={cartEmpty}></img>
                </span>
                <button className="bg-red-500 text-white w-50 h-10 rounded-lg mt-5 outline-none self-end hover:cursor-pointer">Pagar</button>
            </div>
            }
        </section>
                

    )
}