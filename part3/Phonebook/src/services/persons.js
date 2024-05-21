import axios from 'axios'
const baseUrl = "/api/persons"
//----Proxy:
/* 'https://fullstackopenexercises-ekg0.onrender.com/api/persons' */

//----Backend extraido de app.jsx 2.13
const getAll = () => {
  return axios.get(baseUrl).then(res=>res.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(res=>res.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res=>res.data)
}
//--- axios use strings as id's
const deleteP = id => {
    return axios.delete(`${baseUrl}/${id}`).then(res=>
        {res.data})
}
//Variables y claves con nombres iguales
export default {getAll,create,update,deleteP}