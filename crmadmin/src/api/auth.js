import axios from 'axios'
import config from '../config'

axios.defaults.headers.post['Content-Type'] = 'application/json'

async function login (data, options = {}) {
  let result = await axios.post(`${config.authUrl}/login`, data, options)
  return result
}

export default {
  login
}
