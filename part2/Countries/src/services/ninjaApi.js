import axios from 'axios'
const baseUrl = 'https://api.api-ninjas.com/v1/weather?'
const headers= {
    'X-Api-Key': import.meta.env.VITE_SOME_KEY
  }

const getWeather = (country, city) => {
  return axios.get(`${baseUrl}city=${city}&country=${country}`,
    {headers}
  )
    .then(res=>res.data)
}

//Variables y claves con nombres iguales
export default {getWeather}