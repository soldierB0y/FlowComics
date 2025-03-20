import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseUrl } from './urlGlobal';
import { useUser } from './userGlobal';
import defaultImg from '../assets/imgs/defaultBook.jpeg'

var token;



export const Panel = () => {


    async function enviarForm(form) {
        console.log('TOKEN ADQUIRIDO:',userToken);

        // Usa FormData para manejar el envío del formulario con archivos
        const formData = new FormData();
        for (const [key, value] of form.entries()) {
            formData.append(key, value);
        }

        try {
            const result = await fetch(url + 'libros', {
                method: 'POST',
                headers: {
                    'authorization': userToken, // No incluyas 'Content-Type', fetch lo maneja automáticamente con FormData
                },
                body: formData, // Enviar el FormData directamente
            });
            if(result.ok)
                setBotonRegistrar('Enviado');
                setTimeout(() => {
                    const form= document.getElementById('form1');
                    if(form)
                        form.reset();
                    setBotonRegistrar('Registrar')
                }, 2000);
        } catch (error) {
            setBotonRegistrar('Reintentar')
            console.error('Error al enviar el formulario:', error);
        }
    }



    const inputStyle = 'bg-white border w-full py-2 rounded-lg pl-3';
    const { url } = UseUrl();
    const { userToken, setUserToken } = useUser();
    const { userInfo } = useUser();
    const productoDefault = { titulo: '', autor: '', precioVenta: '', precioOferta: '', costoProduccion: '', categorias: '', ancho: '', alto: '', paginas: '', cantidad: '', img:{} };
    const [producto, setProducto] = useState(productoDefault);
    const [modal, setModal] = useState('hidden');
    const [errCampos, setErrCampos] = useState('hidden');
    const [botonRegistrar, setBotonRegistrar] = useState('Registrar');
    const navigator = useNavigate();
    const [showsInfo,setShowsInfo]= useState(false);

    useEffect(() => {
        if (userInfo.rol !== 'admin')
            navigator('/');
    }, [userInfo]);



    useEffect(() => {
        token = userToken;
        console.log('THE TOKEN', token);
    }, []);


    setTimeout(() => {
        setShowsInfo(true);
    }, 200);


    return (
        <section  className="w-screen flex items-center justify-center">
            {showsInfo==false?<></>:<>
                
                <div className={"absolute max-h-100 top-40 w-90 overflow-scroll rounded-xl min-h-50 p-5 bg-white items-center justify-start border flex-col " + modal}>
                <h1 className='pb-5 text-center'>Nuevo Producto</h1>
                <form id='form1'
                 className='h-full flex gap-5 w-full flex-col'>
                    <input name='titulo' value={producto.titulo} onChange={(e) => { setProducto({ ...producto, titulo: e.target.value }) }} className={inputStyle} type='text' placeholder="titulo" />
                    <input name='autor' value={producto.autor} onChange={(e) => { setProducto({ ...producto, autor: e.target.value }) }} className={inputStyle} type='text' placeholder="autor" />
                    <input name='precioVenta' value={producto.precioVenta} onChange={(e) => { setProducto({ ...producto, precioVenta: e.target.value }) }} className={inputStyle} type='number' placeholder="precio de venta" />
                    <input name='precioOferta' value={producto.precioOferta} onChange={(e) => { setProducto({ ...producto, precioOferta: e.target.value }) }} className={inputStyle} type='number' placeholder="precio de oferta" />
                    <input name='costoProduccion' value={producto.costoProduccion} onChange={(e) => { setProducto({ ...producto, costoProduccion: e.target.value }) }} className={inputStyle} type='number' placeholder="costo produccion" />
                    <input name='categorias' value={producto.categorias} onChange={(e) => { setProducto({ ...producto, categorias: e.target.value }) }} className={inputStyle} type='text' placeholder="categorias" />
                    <input name='ancho' value={producto.ancho} onChange={(e) => { setProducto({ ...producto, ancho: e.target.value }) }} className={inputStyle} type='number' placeholder="ancho" />
                    <input name='alto' value={producto.alto} onChange={(e) => { setProducto({ ...producto, alto: e.target.value }) }} className={inputStyle} type='number' placeholder="alto" />
                    <input name='paginas' value={producto.paginas} onChange={(e) => { setProducto({ ...producto, paginas: e.target.value }) }} className={inputStyle} type='number' placeholder="paginas" />
                    <input name='cantidad' value={producto.cantidad} onChange={(e) => { setProducto({ ...producto, cantidad: e.target.value }) }} className={inputStyle} type='number' placeholder="cantidad" />
                    
                    <img className='w-full h-50 object-cover' draggable={false} id='img-container' src={defaultImg}></img> 
                    <input id='imgInput' name='img'
                        className={inputStyle}
                        type="file"
                        accept="image/*"
                        placeholder="img"

                        onChange={(e)=>{
                            const file= URL.createObjectURL(e.target.files[0]) ||defaultImg;
                            const showImg= document.getElementById('img-container');
                            console.log(showImg)
                            showImg.setAttribute('src',file)
                        }}
                    />
                    <p className={'text-red-500 text-center w-full bg-red-100 px-2 ' + errCampos}>Rellene los campos</p>
                    <span className="flex flex-row justify-around w-full gap-2 py-3">
                        <button type="button" className="bg-slate-500 flex-1 text-white rounded-md py-1 hover:bg-slate-400 hover:cursor-pointer"
                            onClick={()=>{
                                var sendTrue= true;

                                for (let prop in producto)
                                {
                                    if(producto[prop] =='')
                                        sendTrue=false;
                                        break

                                }

                                if (sendTrue==true)
                                {
                                    const form= document.getElementById('form1');
                                    const formData= new FormData(form);
                                    setBotonRegistrar('Enviando...');
                                    setErrCampos('hidden')
                                    setProducto(productoDefault);

                                    enviarForm(formData);
                                }
                                else
                                {
                                    setErrCampos('flex')
                                }
                            
                            }}
                        >{botonRegistrar}</button>

                        <button type='button' className="bg-red-400 flex-1 text-white rounded-md py-1 hover:bg-red-300 hover:cursor-pointer"
                            onClick={() => {
                                setModal('hidden')
                            }}
                        >atras</button>
                    </span>
                </form>
            </div>
            <section className="w-full max-w-7xl   flex items-center justify-start p-5 flex-col gap-5 ">
                <h1><b>Panel</b></h1>
                <div className="bg-slate-100 rounded-3xl flex flex-col items-center p-5 w-full gap-5 h-125 justify-center">
                    <h1>Productos</h1>
                    <div className="flex w-full justify-center py-5 flex-col items-center gap-5">
                        <span className="bg-red-400 w-50 h-10 flex items-center justify-center rounded-xl hover:cursor-pointer hover:bg-red-300">
                            <h3 className="text-white">Mis Productos</h3>
                        </span>
                        <button className="bg-red-400 hover:bg-red-300 hover:cursor-pointer text-white  rounded-xl  w-50 h-10 flex items-center justify-center "
                            onClick={() => {
                                setModal('flex')
                            }}
                        >Agregar</button>
                    </div>
                </div>

            </section>
            </>}

        </section>
    );
};