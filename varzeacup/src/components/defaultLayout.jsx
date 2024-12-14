import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider.jsx";
import axiosClient from "../axiosClient.js";

export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    return(
        <div id="defaultLayout">
         <div className="content">
            <header>
                <div>
                    <Link className="btn-logout" to={"/"}>Inicial</Link>
                </div>
                <div>
                    {user.name}
                    <a href="#" style={{marginLeft:4}} onClick={onLogout} className="btn-logout"> Logout</a>
                </div>
            </header>
            <main>
            <Outlet />
            </main>
            </div>
        </div>
    )
}