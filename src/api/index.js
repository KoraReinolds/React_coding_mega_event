import axios from 'axios'

const token = localStorage.getItem('token')

export default axios.create({
  baseURL: process.env.BACKEND_URL || "http://pink-code.ru:20085/",
  headers: {
    'Content-Type': 'application/json',
    ...token ? { 'Authorization': `Bearer ${token}` } : {}
  }
})