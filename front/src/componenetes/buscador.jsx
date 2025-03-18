import { useState } from "react";
import search from '../assets/imgs/search.png';
import close from '../assets/imgs/close.png';
import { useNavigate } from "react-router-dom";

export const Buscador= ()=>{

    const [buscadorValue,setBuscadorValue]=useState('')
    const [showModal,setShowModal]= useState('hidden');
    const [searchButton,setSearchButton]= useState('block')
    const navigator= useNavigate();

    return(
        <>
            <div className="w-full px-5 py-5 flex flex-row justify-center gap-2 relative">
                {
                    /*
                        <input type="text" value={buscadorValue} className="bg-gray-100 border-sky-300 border-none outline-none"
                            onChange={
                                (e)=>{
                                    setBuscadorValue(e.target.value)
                                }
                            }
                        ></input>  
                    
                    */
                }
                <img draggable='false' className={"w-7 h-7 object-cover hover:cursor-pointer select-none self-start absolute left-4 lg:left-40 "+searchButton} src={search}
                    onClick={()=>{
                        if (showModal=='flex')
                            setShowModal('hidden')
                        else
                        {
                            setShowModal('flex')
                            setSearchButton('hidden')
                        }
                    }}
                ></img>
                <div className={"w-4xl  rounded-2xl  bg-slate-100 relative overflow-hidden flex-row items-center "+showModal} >
                    <img 
                        onClick={()=>{
                            setBuscadorValue('');
                            setShowModal('hidden')
                            setSearchButton('flex');
                        }}
                    
                    src={close} draggable='false' className="w-3  ml-5 h-3 top-4 absolute invert-50 cursor-pointer" ></img>
                    <span className="w-full flex flex-row gap-1">
                        <input  type="text" value={buscadorValue} placeholder="Buscar..." className="text-slate-600 p-5 pl-10 text-xl tracking-wide bg-slate-200 h-10 w-full border-sky-300 border-none outline-none"
                            onChange={
                                (e)=>{
                                    setBuscadorValue(e.target.value)
                                }
                            }
                        ></input>
                        <button className="bg-red-500 h-10 w-50 text-white rounded-lg hover:cursor-pointer hover:bg-red-400"
                            onClick={()=>{
                                if(buscadorValue != '')
                                    navigator('/buscador')
                            }}
                        >Buscar</button>
                    </span>
                </div>

            </div>  
        </>
    )
}