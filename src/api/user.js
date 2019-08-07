import axios from '@/libs/api.request'

export const getUserInfo = (userName) => {
  return axios.request({
    url: '/user/getUserInfoByUserName',
    params: {
      userName
    },
    method: 'get'
  })
}

export const getUsers = (deptId, userName, email) => {
  return axios.request({
    url: '/user/getUsers',
    params: {
      deptId,
      userName,
      email
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/user/logout',
    method: 'post'
  })
}
