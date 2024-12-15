import { useEffect, useState } from "react"
import axiosClient from "../../axiosClient"

export default function Tabela(){

    const [times, setTimes] = useState([])
    const [partidas, setPartidas] = useState([])

    const dataInicio = new Date("2024-01-01");
    const dataFim = new Date("2024-12-31");

    const partidasFiltradas = partidas.filter(p => {
        const dataPartida = new Date(p.horario);
        return dataPartida >= dataInicio && dataPartida <= dataFim;
    });
    
    const [loading, setLoading] = useState(true)

    
    const getTimes = () => {
        setLoading(true)
        axiosClient.get('/tabela/time')
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
        axiosClient.get('/tabela/partida')
          .then(({ data }) => {
            setLoading(false)
            setPartidas(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
    }

    useEffect(()=>{
        getTimes();
        getPartidas();
    },[])


    return(
        <div className="defaultLayout">
            <div className="card animated fadeInDown">   
                <h1>Tabela de Classificação</h1>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Posição</th>
                            <th>Clube</th>
                            <th>Pts</th>
                            <th>PJ</th>
                            <th>Vit</th>
                            <th>E</th>
                            <th>DER</th>
                        </tr>
                    </thead>
                    {
                        loading && 
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {
                        !loading && 
                        <tbody>
                            {
                                times.map((t, index)=>{
                                    return( 
                                        <tr key={t.id}>
                                            <td>{index+1}</td>
                                            <td>{t.nome}</td>
                                            <td>{t.pontuacao}</td>
                                            <td>{t.partidas_jogadas}</td>
                                            <td>{t.vitorias}</td>
                                            <td>{t.empates}</td>
                                            <td>{t.derrotas}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    }
                </table>
                <br/>
                <h1>Partidas</h1>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Time da Casa</th>
                            <th>Time de Fora</th>
                            <th>Data</th>
                            <th>Rodada</th>
                        </tr>
                    </thead>
                    {
                        loading && 
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {
                        !loading && 
                        <tbody>
                            {
                                partidasFiltradas.map((p)=>{
                                    return( 
                                        <tr key={p.id}>
                                            <td>{times && times.find(t=>t.id===p.time_casa_id)?.nome}</td>
                                            <td>{times && times.find(t=>t.id===p.time_visitante_id)?.nome}</td>
                                            <td>{p.horario}</td>
                                            <td>{p.rodada}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}