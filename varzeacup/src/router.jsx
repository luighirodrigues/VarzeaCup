import {createBrowserRouter} from 'react-router-dom';
import Login from './views/user/login.jsx'
import Register from './views/user/register.jsx'
import DefaultLayout from './components/defaultLayout.jsx'
import GuestLayout from './components/guestLayout.jsx'
import Users from './views/user/users.jsx';
import UserForm from './views/user/userForm.jsx';
import Times from './views/time/times.jsx';
import TimeForm from './views/time/timeForm.jsx';
import LoggedMain from './views/user/loggedMain.jsx';
import Partidas from './views/partida/partidas.jsx';
import PartidaForm from './views/partida/partidaForm.jsx';
import Tabela from './views/classificacao/mainPage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<LoggedMain/>
            },
            {
                path:'/users',
                element:<Users/>
            },
            {
                path:'/users/new',
                element:<UserForm key={"UserCreate"}/>
            },
            {
                path:'/users/:id',
                element:<UserForm key={"UserUpdate"}/>
            },
            {
                path:'/times',
                element:<Times/>
            },
            {
                path:'/times/new',
                element:<TimeForm key={"TimeCreate"}/>
            },
            {
                path:'/times/:id',
                element:<TimeForm key={"TimeUpdate"}/>
            },
            {
                path:'/partidas',
                element:<Partidas/>
            },
            {
                path:'/partidas/new',
                element:<PartidaForm key={"PartidaCreate"}/>
            },
            {
                path:'/partidas/:id',
                element:<PartidaForm key={"PartidaUpdate"}/>
            },
            {
                path:'/classificacao',
                element:<Tabela/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/tabela',
                element:<Tabela/>
            }
        ]
    },
]);

export default router;

