import axios from "axios";
import config from "./config"


 export async function getAllStationery(){
    const URL =config.BASE_URL +'/statinery'
    const response =await axios.get(URL)
    return response.data
}