import axios from "axios" ;

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key:"1044c4fe22053f24519e99e6e5874882",
        language: "pt-BR",
        include_adult:false,
    }
});