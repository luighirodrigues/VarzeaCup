import { useEffect, useState } from "react"
import axiosClient from "../../axiosClient"

export default function Tabela(){

    const [times, setTimes] = useState([])
    const [loading, setLoading] = useState(true)

    const getTimes = () => {
        setLoading(true)
        axiosClient.get('/tabela')
          .then(({ data }) => {
            console.log(data)
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


    return(
        <div className="defaultLayout">
            <div className="card animated fadeInDown">   
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
            </div>
        </div>
    )
}