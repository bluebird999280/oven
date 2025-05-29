import axios from "axios";

const devAxios = axios.create({
    baseURL : "http://localhost:4000",
})

const prodAxios = axios.create({
    baseURL : "http://localhost:4000"
})

export default devAxios;