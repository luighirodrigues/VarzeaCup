import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient.js";

export default function PartidaForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [partida, setPartida] = useState({
        id: null,
        time_casa_id: null,
        time_visitante_id: null,
        horario: null,
        rodada: null,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [times, setTimes] = useState([])
 
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

    useEffect(()=>{
      getTimes();
    },[])

    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/partidas/${id}`)
              .then(({data}) => {
                setLoading(false)
                setPartida(data)
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (partida.id) {
          axiosClient.put(`/partidas/${partida.id}`, partida)
            .then(() => {
              navigate('/partidas')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
          axiosClient.post('/partidas', partida)
            .then(() => {
              navigate('/partidas')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
          axiosClient.post('/partidas', {time_casa_id:partida.time_visitante_id, time_visitante_id:partida.time_casa_id, horario:partida.horario, rodada:partida.rodada})
            .then(() => {
              navigate('/partidas')
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
      {partida.id && <h1>Atualizando a Partida: {partida.rodada}</h1>}
      {!partida.id && <h1>Nova Partida</h1>}
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
            <input type="datetime-local" value={partida.horario} onChange={ev => setPartida({...partida, horario: ev.target.value})} placeholder="Horario"/>
            <input type="rodada" value={partida.rodada} onChange={ev => setPartida({...partida, rodada: ev.target.value})} placeholder="Rodada"/>
            <label>Time da Casa</label>
            <select defaultValue={partida.time_casa_id?partida.time_casa_id:''} onChange={ev => setPartida({...partida, time_casa_id: ev.target.value})}>
              <option hidden>Selecione um Time</option>
              {
                times && times.map((time)=>{
                  return <option key={time.id} value={time.id}>{time.nome}</option>
                })
              }
            </select>
            <label>Time Visitante</label>
            <select defaultValue={partida.time_visitante_id?partida.time_visitante_id:''} onChange={ev => setPartida({...partida, time_visitante_id: ev.target.value})}>
              <option hidden>Selecione um Time</option>
              {
                times && times.map((time)=>{
                  return <option key={time.id} value={time.id}>{time.nome}</option>
                })
              }
            </select>
            <button className="btn">Salvar</button>
          </form>
        )}
      </div>
    </>
    )
}