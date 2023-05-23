import axios from "axios";
// BASE DA URL //https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/now_playing?api_key=0b7e11986cb7ea02f8a1f07005938394&language=pt-BR


    const api = axios.create({
        baseURL: 'https://api.themoviedb.org/3/'
    });

    export default api;