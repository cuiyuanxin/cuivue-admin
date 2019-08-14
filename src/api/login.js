import axios from '@/libs/api.request'
import { BASE_URL } from '@/config/config' // 导入公共变量

// 获取验证码
export const getVerify = BASE_URL + '/admin/login/verify' + '?' + Math.random()

// 登录后台
export const setLogin = (username, password) => {
	const data = {
		username,
		password
	}
	return axios.request({
		url: '/admin/login/login',
		data,
		method: 'post'
	})
}

// 验证登录表单
export const isValidation = (username, password) => {
	const data = {
		fun: 'login',
		username,
		password
	}
	return axios.request({
		url: '/admin/login/validation',
		data,
		method: 'post'
	})
}

// 退出登录
export const setlLogout = (token) => {
	return axios.request({
		url: '/admin/login/logout',
		method: 'post'
	})
}
