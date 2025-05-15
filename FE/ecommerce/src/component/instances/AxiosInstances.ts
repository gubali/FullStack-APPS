import axios from "axios";
import {BASE_URL} from '../constant/Constant';

const axiosIstances = axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json'
    }
});

export default axiosIstances;