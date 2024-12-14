import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from '../../contexts/contextProvider'

export default function Register() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
            }
            console.log(err)
        });
    }

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Crie sua Conta
                </h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="text" placeholder="Nome" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <label>Senha Precisa Conter 1 Letra, Minimo de 8 Caracteres</label>
                    <input ref={passwordRef} type="password" placeholder="Senha" />
                    <button className="btn btn-block" type="submit">Registrar</button>
                    <p className="message">
                        Ja registrado? <Link to={'/login'}>Entre Aqui</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}