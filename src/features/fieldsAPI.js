import axios from '../../api'

export const logIn = async (data) => {
  await axios.post('/auth', data)
}
