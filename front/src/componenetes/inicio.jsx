import { Buscador } from "./buscador"
import { Carrito } from "./carrito"


export const Inicio=()=>{
    return(
        <>
            <Buscador></Buscador>
            <section className="w-full px-5 text-center">
                <h1 className="font-semibold p-8 text-left pl-0 lg:pl-15 :pl-0 lg:text-3xl text-xl lg:text-center">Destacado</h1>
                <div className="bg-slate-100 w-full h-100 rounded-2xl flex flex-col items-center p-5 lg:w-4xl lg:justify-self-center">
                    <h2>Contenido</h2>
                </div>
            </section>
        </>
    )
}