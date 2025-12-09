import axios from "axios"


const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}` || "http://localhost:5000/api", // connect to the backend URL 
    headers: {
        "Content-Type" : "application/json",
    },
  withCredentials: true,  
})

export default api;