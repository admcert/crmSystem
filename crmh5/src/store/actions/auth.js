import auth from '../../api/auth'
import config from '../../config'
import api from '../../api/normal'

export async function register ({commit}, data) {
  let result = await auth.register(data)
  return result
}

export async function login ({commit}, data) {
  let result = await auth.login(data)
  sessionStorage.setItem('actoken', `${result.data.token}`)
  sessionStorage.setItem('isActived', `${result.data.isActive}`)
  config.headers['Authorization'] = `Bearer ${result.data.token}`
  api.setAuthorization(`Bearer ${result.data.token}`)
  return result
}

export async function plogin ({commit}, data) {
  let result = await auth.plogin(data)
  sessionStorage.setItem('actoken', `${result.data.token}`)
  sessionStorage.setItem('isActived', `${result.data.isActive}`)
  config.headers['Authorization'] = `Bearer ${result.data.token}`
  api.setAuthorization(`Bearer ${result.data.token}`)
  return result
}
