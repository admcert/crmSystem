import axios from 'axios'
import config from '../config'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers['Authorization'] = config.headers.Authorization

function setAuthorization (token) {
  axios.defaults.headers['Authorization'] = token
}

/**
 * 添加商品
*/
async function addGoods (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/goods`, data, options)
  return result
}

/**
 * 获取商品列表
*/
async function getGoodsList (options = {}) {
  let result = await axios.get(`${config.apiUrl}/goods/all`, options)
  return result
}

/**
 * 删除商品
*/
async function delGoods (data, options = {}) {
  let result = await axios.delete(`${config.apiUrl}/goods/${data.id}`, options)
  return result
}

/**
 * 编辑商品
*/
async function editGoods (data, options = {}) {
  let result = await axios.put(`${config.apiUrl}/goods/${data.id}`, data, options)
  return result
}

/**
 * 获取用户列表
*/
async function getUserList (data, options = {}) {
  console.log(data)
  let result = await axios.post(`${config.apiUrl}/user/list`, data, options)
  return result
}

/**
 * 提交公告
*/
async function submitAnnouncement (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/announcement`, data, options)
  return result
}

export default {
  setAuthorization,
  addGoods,
  getGoodsList,
  delGoods,
  editGoods,
  getUserList,
  submitAnnouncement
}