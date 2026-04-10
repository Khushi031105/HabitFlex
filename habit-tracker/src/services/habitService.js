import axios from 'axios'
import authService from './authService'

const apiBaseUrl = process.env.REACT_APP_API_URL || '/api'
const url = `${apiBaseUrl}/habits`

const getAll = async () => {
  const config = { headers: { Authorization: authService.getToken() } }
  const res = await axios.get(url, config)
  return res.data
}

const addNew = async (habitObject) => {
  const config = { headers: { Authorization: authService.getToken() } }
  const res = await axios.post(url, habitObject, config)
  return res.data
}

const update = async (habitObject) => {
  const config = { headers: { Authorization: authService.getToken() } }
  const res = await axios.put(`${url}/${habitObject.id}`, habitObject, config)
  return res.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: authService.getToken() } }
  const res = await axios.delete(`${url}/${id}`, config)
  return res.data
}

export default { getAll, addNew, update, remove }