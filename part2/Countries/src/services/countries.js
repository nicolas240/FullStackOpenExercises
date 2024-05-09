import axios from 'axios'
const baseUrl = ' https://studies.cs.helsinki.fi/restcountries/api/'
//----Backend extraido de app.jsx 2.13
const getAll = () => {
  return axios.get(`${baseUrl}all`).then(res=>res.data)
}

const getCountryByName = ({name}) => {
  return axios.get(`${baseUrl}name/${name}`).then(res=>res.data)
}

//Variables y claves con nombres iguales
export default {getAll,getCountryByName}