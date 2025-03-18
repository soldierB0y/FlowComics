import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseUrl } from './urlGlobal';
import { useUser } from './userGlobal';

var catchUrl = '';
var token = '';

async function crearProducto(prod) {
    const jsonProd = JSON.stringify(prod);
    try {
        const result = await fetch(catchUrl + 'libros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            },
            body: jsonProd
        });
        if (result.ok)
            return true;
        else
            return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const Panel = () => {
    const inputStyle = 'bg-white border w-full py-2 rounded-lg pl-3';
    const { url } = UseUrl();
    const { userToken, setUserToken } = useUser();
    const { userInfo } = useUser();
    const productoDefault = { titulo: '', autor: '', precioVenta: '', precioOferta: '', costoProduccion: '', categorias: '', ancho: '', alto: '', paginas: '', cantidad: '', img: '' };
    const [producto, setProducto] = useState(productoDefault);
    const [modal, setModal] = useState('hidden');
    const [errCampos, setErrCampos] = useState('hidden');
    const [botonRegistrar, setBotonRegistrar] = useState('Registrar');
    const navigator = useNavigate();

    useEffect(() => {
        if (userInfo.rol !== 'admin')
            navigator('/');
    }, [userInfo]);

    useEffect(() => {
        catchUrl = url;
    }, []);

    useEffect(() => {
        token = userToken;
        console.log('THE TOKEN', token);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await crearProducto(producto);
        if (success) {
            setProducto(productoDefault); // Restablecer el estado del producto
            setModal('hidden'); // Ocultar el modal si es necesario
            // Puedes agregar más lógica aquí si es necesario
        } else {
            setErrCampos('visible'); // Mostrar mensaje de error si es necesario
        }
    };

    return (
        <section className="w-screen flex items-center justify-center">
            <div className={"absolute max-h-100 top-28 w-90 overflow-scroll rounded-xl min-h-50 p-5 bg-white items-center justify-start border flex-col " + modal}>
                <h1 className='pb-5 text-center'>Nuevo Producto</h1>
                <form onSubmit={handleSubmit} className='h-full flex gap-5 w-full flex-col'>
                    <input value={producto.titulo} onChange={(e) => { setProducto({ ...producto, titulo: e.target.value }) }} className={inputStyle} type='text' placeholder="titulo" />
                    <input value={producto.autor} onChange={(e) => { setProducto({ ...producto, autor: e.target.value }) }} className={inputStyle} type='text' placeholder="autor" />
                    <input value={producto.precioVenta} onChange={(e) => { setProducto({ ...producto, precioVenta: e.target.value }) }} className={inputStyle} type='number' placeholder="precio de venta" />
                    <input value={producto.precioOferta} onChange={(e) => { setProducto({ ...producto, precioOferta: e.target.value }) }} className={inputStyle} type='number' placeholder="precio de oferta" />
                    <input value={producto.costoProduccion} onChange={(e) => { setProducto({ ...producto, costoProduccion: e.target.value }) }} className={inputStyle} type='number' placeholder="costo produccion" />
                    <input value={producto.categorias} onChange={(e) => { setProducto({ ...producto, categorias: e.target.value }) }} className={inputStyle} type='text' placeholder="categorias" />
                    <input value={producto.ancho} onChange={(e) => { setProducto({ ...producto, ancho: e.target.value }) }} className={inputStyle} type='number' placeholder="ancho" />
                    <input value={producto.alto} onChange={(e) => { setProducto({ ...producto, alto: e.target.value }) }} className={inputStyle} type='number' placeholder="alto" />
                    <input value={producto.paginas} onChange={(e) => { setProducto({ ...producto, paginas: e.target.value }) }} className={inputStyle} type='number' placeholder="paginas" />
                    <input value={producto.cantidad} onChange={(e) => { setProducto({ ...producto, cantidad: e.target.value }) }} className={inputStyle} type='number' placeholder="cantidad" />
                    <input  onChange={(e) => {
                        const fr= new FileReader();
                        const file= e.target.files[0];
                        console.log('THE FILE',file.type)
                        fr.readAsArrayBuffer(file);
                        fr.onload= function(){
                            console.log(fr.result)
                            const blob= new Blob([[fr.result],{type:file.type}])
                            console.log('THE BLOB',blob);
                            setProducto({...producto,img:blob})
                        }

                    }} className={inputStyle + ''} type='file' accept="image/*" placeholder="img" />
                    <p className={'text-red-500 text-center ' + errCampos}>Rellene los campos</p>
                    <span className="flex flex-row justify-around w-full gap-2 py-3">
                        <button type="submit" className="bg-slate-500 flex-1 text-white rounded-md py-1 hover:bg-slate-400 hover:cursor-pointer">{botonRegistrar}</button>
                        <button className="bg-red-400 flex-1 text-white rounded-md py-1 hover:bg-red-300 hover:cursor-pointer"
                            onClick={() => {
                                setModal('hidden')
                            }}
                        >atras</button>
                    </span>
                </form>
            </div>
            <section className="w-full min-h-50 bg-white flex items-center justify-start p-5 flex-col gap-5">
                <h1>Panel</h1>
                <div className="bg-slate-100 rounded-3xl flex flex-col items-center p-5 w-full gap-5">
                    <div className="flex w-full justify-center py-5">
                        <span className="bg-red-400 px-13 py-3 rounded-xl hover:cursor-pointer hover:bg-red-300">
                            <h3 className="text-white">Mis producto</h3>
                        </span>
                    </div>
                </div>
                <div className="bg-slate-100 rounded-3xl flex flex-col items-center p-5 w-full gap-5">
                    <div className="flex w-full justify-center py-5 flex-col justify-center items-center">
                        <h2>producto</h2>
                        <button className="bg-red-400 hover:bg-red-300 hover:cursor-pointer text-white w-40 py-2 rounded-xl"
                            onClick={() => {
                                setModal('flex')
                            }}
                        >Agregar</button>
                    </div>
                </div>
            </section>
        </section>
    );
};