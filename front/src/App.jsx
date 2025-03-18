import './App.css';
import { Buscador } from './componenetes/buscador.jsx';
import { UrlProvider } from './componenetes/urlGlobal.jsx';
import { InicioSesion } from './componenetes/iniciarSesion.jsx';
import { Inicio } from './componenetes/inicio.jsx';
import { Navegador } from './componenetes/navegador.jsx';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserProvider } from './componenetes/userGlobal.jsx';
import { Panel } from './componenetes/panel.jsx';
import { ContenedorBuscador } from './componenetes/contenedorBuscador.jsx';


function App() {
  return (
    <Router basename='/'>
      <UserProvider>
        <UrlProvider>
          <Navegador />
          <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/login' element={<InicioSesion/>}/>
            <Route path='/panel' element={<Panel/>}/>
            <Route path='/buscador' element={<ContenedorBuscador/>}/>
          </Routes>
        </UrlProvider>
      </UserProvider>
    </Router>
  );
}

export default App
