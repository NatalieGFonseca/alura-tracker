
import axios, { AxiosInstance } from "axios"

const clientApi : AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
})

export default clientApi