import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient.js";

export default function Times(){
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getTimes();
    }, [])

    const onDeleteClick = time => {
        if (!window.confirm("Tem certeza que deseja deletar o time?")) {
          return
        }
        axiosClient.delete(`/times/${time.id}`)
          .then(() => {
            getTimes()
          })
      }

    const getTimes = () => {
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

    return(
        <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Times</h1>
          <Link className="btn-add" to="/times/new">Adicionar Novo</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Vitorias</th>
              <th>Empates</th>
              <th>Derrotas</th>
              <th>Partidas Jogadas</th>
              <th>Pontos</th>
              <th>Ações</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {times.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.nome}</td>
                  <td>{t.vitorias}</td>
                  <td>{t.empates}</td>
                  <td>{t.derrotas}</td>
                  <td>{t.partidas_jogadas}</td>
                  <td>{t.pontuacao}</td>
                  <td>
                    <Link className="btn-edit" to={'/times/' + t.id}>Editar</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(t)}>Deletar</button>
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