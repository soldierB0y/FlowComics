import { useEffect, useState } from "react";
import { UseUrl } from "./urlGlobal";
import { Buscador } from "./buscador";
import { data } from "react-router-dom";
import book from '../assets/imgs/defaultBook.jpeg'
import { useUser } from "./userGlobal";

export const ContenedorBuscador = () => {
    const [items, setItems] = useState([]);
    const {carritoItems,setCarritoItems}= useUser();
    const { url } = UseUrl();
    const fetchUrl = url + 'libros';
    const [counter, setCounter] = useState(2);
    const itemH = 60;
    const [allImgs, setAllImgs] = useState([]);
    const [modalProducto,setModalProducto]= useState({visibilidad:'hidden',index:null});

    useEffect(() => {
        fetch(fetchUrl)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                console.log('THE DATA',data)
                const imgs = data.map((item) => {
                    if (item.img && item.img.data && item.img.data.length > 0) {
                        // Convertir el buffer binario en un Blob
                        const blob = new Blob([new Uint8Array(item.img.data)], { type: 'image/jpeg' }); // Cambia el tipo MIME según corresponda
                        return URL.createObjectURL(blob);
                    } else {
                        return null; // Si no hay imagen, devuelve null
                    }
                });

                setAllImgs(imgs);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log('ALL IMGS', allImgs);
    }, [allImgs]);

    return (
        <section className="w-full flex flex-col items-center">
            <Buscador />
            <div className={"z-1000 fixed max-h-100 top-[25%]  w-[90%] lg:w-[40%] overflow-scroll rounded-xl min-h-[40%] p-5 bg-slate-100 items-center justify-start border flex-col bg-slate-100 "+modalProducto.visibilidad}>
                {modalProducto.index!=null?
                <span className="w-full gap-10 flex items-start flex-col justify-center">
                    <span className="w-full p-5 border border-slate-300 rounded-xl bg-white">
                        <b><h2>{items[modalProducto.index].titulo}</h2></b>
                        <h3>{items[modalProducto.index].autor}</h3>
                        <h3>{'dimensiones: '+items[modalProducto.index].alto+'x'+items[modalProducto.index].ancho+'cm'}</h3>
                        <h3>{'disponibles: '+items[modalProducto.index].cantidad}</h3>
                        <h3>{'paginas: '+items[modalProducto.index].paginas}</h3>
                        <span className="w-full flex justify-end">
                            <span className="bg-sky-300 text-white px-4 py-1 rounded-md">{items[modalProducto.index].precioVenta+' DOP'}</span>
                        </span>
                    </span>
                    <span className="w-full flex flex-row justify-around">
                    <button className="bg-sky-400 self-center text-white w-30 h-10 rounded-xl hover:cursor-pointer hover:bg-sky-300"
                            onClick={()=>{
                                const item= items[modalProducto.index];
                                item.cantidad=1;
                                setCarritoItems((prev)=>{
                                    const existe= prev.find((carritoItem,index)=>index==modalProducto.index);
                                    if(existe)
                                    {
                                        return prev.map((carritoItem) =>
                                            carritoItem.IDLibro === item.IDLibro
                                                ? { ...carritoItem, cantidad: carritoItem.cantidad + 1 } // Actualiza la cantidad si coincide el ID
                                                : carritoItem // Devuelve el elemento original si no coincide
                                        );
                                    }
                                    else
                                        return [...prev,item];
                                })
                                setModalProducto({...modalProducto,visibilidad:'hidden'})

                            }}
                        >Agregar</button>
                        <button className="bg-red-500 self-center text-white w-30 h-10 rounded-xl hover:cursor-pointer hover:bg-red-400"
                            onClick={()=>{
                                setModalProducto({...modalProducto,visibilidad:'hidden'})
                            }}
                        >atras</button>
                    </span>

                </span>:<></>
                }
            </div>
            <section className="bg-white w-full p-5">
                <div className="w-full bg-slate-100 rounded-3xl flex flex-col items-center gap-5">
                    <div className={`w-full min-h-70 flex flex-row flex-wrap justify-center items-center p-5 gap-5 overflow-hidden h-${itemH * counter}`}>
                        {items.length > 0? items.map((item, index) => (
                            <span className="w-[70%] md:w-[45%] max-w-75 h-70 bg-red-100 rounded-xl flex flex-col overflow-hidden hover:cursor-pointer" key={index}
                                onClick={()=>{
                                    //console.log(item.IDLibroLibro);
                                    setModalProducto({...modalProducto,visibilidad:'flex',index:index})
                                }}
                            >
                                <span className="flex  bg-slate-400 px-1 py-3 items-center justify-around text-white">
                                    <h2 className="text-center">{item.titulo}</h2>
                                    <h2>{item.autor}</h2>
                                </span>
                                <img
                                    src={allImgs[index] || book} // Muestra una imagen de placeholder si no hay imagen
                                    alt={item.titulo}
                                    className="w-full h-full object-cover"
                                />
                            </span>
                        )):<p>No existen productos </p>}
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
        </section>
    );
};