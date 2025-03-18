import { useEffect, useState } from "react";
import { UseUrl } from "./urlGlobal";
import { Buscador } from "./buscador";

export const ContenedorBuscador = () => {
    const [items, setItems] = useState([{}]);
    const { url } = UseUrl();
    const fetchUrl = url + 'libros';
    const [counter, setCounter] = useState(2);
    const itemH = 60;
    const [allImgs, setAllImgs] = useState([]); // Mover allImgs al estado

    useEffect(  ()=>{
        var datos;
        
        (async()=>{
            const result= await fetch(fetchUrl);
            if (result.ok)
                datos= await result.json();
                setItems(datos);
                datos.forEach(element => {
                    element.img
                });
        })()

    }
    ,[])


    return (
        <>
            <Buscador></Buscador>
            <section className="bg-white w-full p-5">

                <div className={"w-full bg-slate-100 rounded-3xl flex flex-col items-center gap-5"}>
                    <div className={`w-full min-h-130 flex flex-row flex-wrap justify-center items-center p-5 gap-5 overflow-hidden h-${itemH * counter}`}>
                        {items.map((item, index) => (
                            <span className="w-[46%] max-w-75 h-60 bg-red-100 rounded-xl flex flex-col overflow-hidden" key={index}>
                                <span className="flex bg-red-500 px-1 pt-1 justify-around">
                                    <h2 className="text-center">{item.titulo}</h2>
                                    <h2>{item.autor}</h2>
                                </span>
                            </span>
                        ))}
                    </div>
                    <button
                        className="bg-red-500 text-white w-40 rounded-xl h-8 hover:cursor-pointer hover:bg-red-400 outline-none mb-5"
                        onClick={() => {
                            if (counter < items.length) {
                                setCounter((num) => num + 1);
                            }
                        }}
                    >
                        Ver Más
                    </button>
                </div>
            </section>
        </>
    );
};