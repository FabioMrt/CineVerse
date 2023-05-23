/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filme-info.css';
import  { toast } from 'react-toastify';

export function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "0b7e11986cb7ea02f8a1f07005938394",
                    language: "pt-BR",
                }
            })
            .then((response)=> {
                setFilme(response.data);
                setLoading(false);

            })
            .catch(()=> {
                navigate("/", { replace: true });
                return;
            })
        }
        loadFilme();
    }, [navigate, id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@cineverse");

    
    let filmesSalvos = JSON.parse(minhaLista) || [];
    
    const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id)

    if (hasFilme) {
        toast.warn("Este filme já está na lista.");
        return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@cineverse", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
    }


    if(loading) {
        return(
            <div className="filme-info">
                    <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
    <div className="filme-info">
        <h1>{filme.title}</h1>|
       <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
       alt={filme.title} />
       <h3>Sinopse</h3>
       <spam>{filme.overview}</spam>
       <strong>Avaliação: {filme.vote_average} / 10</strong>

       <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
        <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Assistir trailer</a>
        </button>

       </div>

    </div>
    )
}
