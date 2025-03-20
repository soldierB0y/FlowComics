import menu from '../assets/imgs/menu.png'
import shopping from '../assets/imgs/shopping.png'
import userPic from '../assets/imgs/profile-user.png'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from './userGlobal'




export const Navegador =()=>{
  //desestructuramos userinfo de userGlobal para obtener los valores
  const {userInfo,setUserinfo}= useUser();
  const {carritoVisible,setCarritoVisible}=useUser();
  const {carritoItems,setCarritoItems}= useUser();
  const navigator= useNavigate();
  const [menuDisplay,setMenuDisplay]= useState('hidden');
  const [profileDisplay,setProfileDisplay]= useState('hidden');
  const [cantidadItems, setCantidadItems]= useState(0);

  useEffect(()=>{

    var x=0; 

    carritoItems.map(item=>{
    
      x+= 1
    })

    console.log(x);

    setCantidadItems(x)
  },[carritoItems])


    return(
        <nav className='bg-slate-900 p-5 flex flex-row justify-start w-full relative lg:justify-around h-50px'>
        <h1 className='text-xl text-stone-300  py-5 px-10 rounded-lg hover:bg-slate-600 cursor-pointer'
          onClick={()=>{
            navigator('/')
            setMenuDisplay('hidden')
            setProfileDisplay('hidden')

          }}
        >FlowComics</h1>
        <div className='flex content-center justify-center flex-row self-center w-full lg:justify-around gap-10'>
        <ul className={'z-1000 text-stone-300 bg-gray-200 flex-col lg:flex-row lg:flex absolute rounded-md top-20 left-40 lg:bg-slate-900 lg:top-0 lg:relative sm:left-85 lg:left-0 '+menuDisplay}>
            <li className='py-5 px-10 rounded-lg text-slate-950 hover:bg-slate-600 cursor-pointer lg:text-slate-300'>Comics</li>
            <li className='py-5 px-10 rounded-lg text-slate-950 hover:bg-slate-600 cursor-pointer lg:text-slate-300'>Soporte</li>
            <li className='py-5 px-10 rounded-lg text-slate-950 lg:text- hover:bg-slate-600 cursor-pointer lg:text-slate-300'>Newsletter</li>
        </ul>
          <img className='w-8 h-8 self-center object-cover block lg:hidden invert hover:cursor-pointer' src={menu}
            onClick={()=>{
              if(menuDisplay=='flex')
              {
                setMenuDisplay('hidden');
                setProfileDisplay('hidden')
                setCarritoVisible('hidden')
    
              }
              else
              {
                setMenuDisplay('flex');
                setProfileDisplay('hidden')
              }

              setCarritoVisible('hidden');
            }}
          ></img>

            <span className='relative flex items-center justify-center w-8 h-15 flex items-center justify-center'>
              <img className='w-8 h-8 min-w-8 self-center object-cover invert hover:cursor-pointer z-50' src={shopping}
                onClick={()=>{
                  if (carritoVisible=='flex')
                    setCarritoVisible('hidden');
                  else
                  {
                    setCarritoVisible('flex');
                  }

                  setMenuDisplay('hidden');
                  setProfileDisplay('hidden');
                }}
              ></img>
              <span className={'text-white absolute w-5 h-5 rounded-md bg-red-500  flex items-center justify-center z-1000 pointer-events-none top-3 left-3'}>{cantidadItems}</span>

            </span>

          <ul className={'z-1001 overflow-hidden  text-stone-300 bg-gray-200 flex-col absolute rounded-md top-20 right-2 mr-4 '+profileDisplay}>
            {
              !userInfo.username?
              <>
                <li className='py-5 px-10  text-slate-950 hover:bg-slate-600 cursor-pointer hover:text-slate-300'>Crear Cuenta</li>
                <li className='py-5 px-10  text-slate-950 hover:bg-slate-600 cursor-pointer hover:text-slate-300'
                  onClick={()=>{
                  navigator('/login')
                  setMenuDisplay('hidden')
                  setProfileDisplay('hidden')
                }}
                >Iniciar Sesion</li>
                </>:
                <>
                  <li className='py-5 px-10  text-slate-950 hover:bg-slate-600 cursor-pointer hover:text-slate-300'
                    onClick={()=>{
                      setProfileDisplay('hidden');
                    }}
                  >Perfil</li>
                  {
                    userInfo.rol=='admin'?
                    <li className='py-5 px-10  text-slate-950 hover:bg-slate-600 cursor-pointer hover:text-slate-300'
                      onClick={()=>{
                        setProfileDisplay('hidden');
                        navigator('/panel')
                      }}
                    >Panel</li>:
                    <></>
                  }
                  <li className='py-5 px-10  text-slate-950 hover:bg-slate-600 cursor-pointer hover:text-slate-300'
                    onClick={()=>{
                      setUserinfo({});
                      setProfileDisplay('hidden');
                      navigator('/');
                    }}
                  >Cerrar Sesion</li>
                </>
            }
            

          </ul>
          {userInfo?<p className={'text-white items-center hidden lg:flex'}>{userInfo.nombre}</p>:<></>}
          <img className='w-8 h-8 self-center object-cover invert hover:cursor-pointer' draggable='false' src={userPic}
            onClick={()=>{
              setCarritoVisible('hidden');

              if(profileDisplay=='flex')
                {
                  setProfileDisplay('hidden');
                }
                else
                {
                  setProfileDisplay('flex');
                  setMenuDisplay('hidden');
                }
                setCarritoVisible('hidden');
            }}
          ></img>
        </div>

      </nav>
    )
}