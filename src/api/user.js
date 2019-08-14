import axios from '@/libs/api.request'

// 获取用户信息
export const getUserInfo = () => {
	return axios.request({
		url: '/admin/user/getUserInfo',
		params: {},
		method: 'get'
	})
}

export const getUsers = (deptId, username, email) => {
	return axios.request({
		url: '/user/getUsers',
		params: {
			deptId,
			username,
			email
		},
		method: 'get'
	})
}
