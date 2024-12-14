import { Link } from "react-router-dom";

export default function LoggedMain(){

    return(
        <div className="defaultLayout">
            <div className="content">
                <h1><Link to={"/users"} className="btn-logout" style={{textDecoration:"none", color:"black"}}>Usuarios</Link></h1>
                <br/>
                <h1><Link to={"/times"} className="btn-logout" style={{textDecoration:"none", color:"black"}}>Times</Link></h1>
                <br/>
                <h1><Link to={"/partidas"} className="btn-logout" style={{textDecoration:"none", color:"black"}}>Partidas</Link></h1>
                <br/>
                <h1><Link to={"/classificacao"} className="btn-logout" style={{textDecoration:"none", color:"black"}}>Classificação</Link></h1>
            </div>
        </div>
    )
}