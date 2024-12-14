import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient.js";

export default function Partidas(){
    const [partidas, setPartidas] = useState([]);
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getPartidas();
        getTimes();
    }, [])

    const onDeleteClick = partida => {
        if (!window.confirm("Tem certeza que deseja deletar a partida?")) {
          return
        }
        axiosClient.delete(`/partidas/${partida.id}`)
          .then(() => {
            getPartidas()
          })
    }

    const getTimes = ()=> {
      setLoading(true)
        axiosClient.get('/times')
          .then(({ data }) => {
            setLoading(false)
            setTimes(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
    }

    const getPartidas = () => {
        setLoading(true)
        axiosClient.get('/partidas')
          .then(({ data }) => {
            setLoading(false)
            setPartidas(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(
        <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Partidas</h1>
          <Link className="btn-add" to="/partidas/new">Adicionar Novo</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Time da Casa</th>
              <th>Time de Fora</th>
              <th>Horario</th>
              <th>Rodada</th>
              <th>Ações</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {partidas.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{times && times.find(t=>t.id===p.time_casa_id)?.nome}</td>
                  <td>{times && times.find(t=>t.id===p.time_visitante_id)?.nome}</td>
                  <td>{p.horario}</td>
                  <td>{p.rodada}</td>
                  <td>
                    <Link className="btn-edit" to={'/partidas/' + p.id}>Editar</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(p)}>Deletar</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
}