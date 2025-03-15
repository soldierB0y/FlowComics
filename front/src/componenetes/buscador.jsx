import { useState } from "react"
import search from '../assets/imgs/search.png'

export const Buscador= ()=>{

    const [buscadorValue,setBuscadorValue]=useState('')
    const [showModal,setShowModal]= useState('hidden');
    const [searchButton,setSearchButton]= useState('block')


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
                <div className={"w-4xl h-75 rounded-2xl h-50 bg-slate-100 relative overflow-hidden "+showModal} >
                    <span className="w-full flex flex-row gap-1">
                        <input type="text" value={buscadorValue} placeholder="Buscar..." className="text-slate-600 p-5 text-xl tracking-wide bg-slate-200 h-10 w-full border-sky-300 border-none outline-none"
                            onChange={
                                (e)=>{
                                    setBuscadorValue(e.target.value)
                                }
                            }
                        ></input>
                        <button className="bg-red-500 h-10 w-50 text-white rounded-lg hover:cursor-pointer hover:bg-red-400">Buscar</button>
                    </span>
                </div>

            </div>  
        </>
    )
}