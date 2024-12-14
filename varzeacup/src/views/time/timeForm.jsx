import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient.js";

export default function TimeForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [time, setTime] = useState({
        id: null,
        nome: '',
        vitorias: '',
        empates: '',
        derrotas: '',
        partidas_jogadas: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/times/${id}`)
              .then(({data}) => {
                setLoading(false)
                setTime(data)
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (time.id) {
          axiosClient.put(`/times/${time.id}`, time)
            .then(() => {
              navigate('/times')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
          axiosClient.post('/times', time)
            .then(() => {
              navigate('/times')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }
      }

    return(
    <>
      {time.id && <h1>Atualizando o Time: {time.nome}</h1>}
      {!time.id && <h1>Novo Time</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={time.nome} onChange={ev => setTime({...time, nome: ev.target.value})} placeholder="Nome"/>
            <input type="number" value={time.vitorias} onChange={ev => setTime({...time, vitorias: ev.target.value})} placeholder="Vitorias"/>
            <input value={time.derrotas} onChange={ev => setTime({...time, derrotas: ev.target.value})} placeholder="Empates"/>
            <input value={time.empates} onChange={ev => setTime({...time, empates: ev.target.value})} placeholder="Derrotas"/>
            <input value={time.partidas_jogadas} onChange={ev => setTime({...time, partidas_jogadas: ev.target.value})} placeholder="Partidas Jogadas"/>
            <button className="btn">Salvar</button>
          </form>
        )}
      </div>
    </>
    )
}