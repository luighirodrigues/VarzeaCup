import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider.jsx";

export default function GuestLayout(){
    const {token} = useStateContext();
    if(token){
       return <Navigate to='/'/>
    }
    const localizacao = useLocation();
    console.log(localizacao.pathname)
    const login = localizacao.pathname==='/login'
    return(
        <div id="defaultLayout">
         <div className="content">
            {
                !login && <header>
                <div>
                    <Link className="btn-logout" to={"/login"}>Logar</Link>
                </div>
                <div>
                    Convidado
                    <Link className="btn-logout" to={"/login"}>Logar</Link>
                </div>
            </header>
            }
            <main>
            <Outlet />
            </main>
            </div>
        </div>
    )
}