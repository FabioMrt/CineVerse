import "./favoritos.css";    
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
    
    function Favoritos() {

        const [filmes, setFilmes] = useState ([]);

        useEffect(() => {
            const minhaLista = localStorage.getItem("@cineverse");
            setFilmes(JSON.parse(minhaLista) || [])

        }, [])

        function excluirFilme(id){
            let filtroFilmes = filmes.filter( (item) => {
                return(item.id !== id)

            })

            setFilmes(filtroFilmes);
            localStorage.setItem("@cineverse", JSON.stringify(filtroFilmes))
            toast.success("Filme excluído com sucesso.");

        }

        return(
            <div className="meus-filmes">
                <h1>Filmes salvos</h1>

                {filmes.length === 0 && <span> 
                    Você não possui nenhum filme salvo </span>}

                <ul>    
                  {filmes.map((item)=> {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)} className="btn-excluir">Excluir</button>

                            </div>

                        </li>
                    )
                  })}  


                </ul>

            </div>
        )
    }

    export default Favoritos;