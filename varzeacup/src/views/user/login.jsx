import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from '../../contexts/contextProvider'

export default function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    
    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors)
            }
            console.log(err)
        });
    }

    return(
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Faca seu Login
                </h1>
                <form onSubmit={Submit}>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Senha" />
                    <button className="btn btn-block" type="submit">Logar</button>
                    <p className="message">
                        Ainda nao registrado? <Link to={'/register'}>Crie uma nova conta</Link>
                    </p>
                    <p className="message">
                        Deseja ver a tabela de classificacao? <Link to={'/tabela'}>Clique Aqui</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}