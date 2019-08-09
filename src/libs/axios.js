import Axios from 'axios'
import { Message } from 'iview'
import Cookies from 'js-cookie'
import { getToken, delToken } from '@/libs/util'
import { BASE_URL, LOGIN_PAGE_NAME } from '@/config/config' // 导入公共变量

class httpRequest {
	constructor() {
		this.options = {
			method: '',
			url: ''
		}
		// 存储请求队列
		this.queue = {}
	}
	// 销毁请求实例
	destroy(url) {
		delete this.queue[url]
		const queue = Object.keys(this.queue)
		return queue.length
	}
	// 请求拦截
	interceptors(instance, url) {
		// 添加请求拦截器
		instance.interceptors.request.use(config => {
			if ((url !== '/admin/login/login')) {
				config.headers['X-Token'] = getToken()
			}
			// 在发送请求之前做些什么
			return config
		}, error => {
			// 对请求错误做些什么
			return Promise.reject(error)
		})

		// 添加响应拦截器
		instance.interceptors.response.use((res) => {
			let { data } = res
			const is = this.destroy(url)
			// if (!is) {
				// setTimeout(() => {
					// Spin.hide()
				// }, 500)
			// }

			if (data.code !== 0 && data.code !== 10) {
				if (data.code === -2) {
					delToken()
					window.location.href = '/' + LOGIN_PAGE_NAME
					Message.error('未登录，或登录失效，请重新登录！')
				} else {
					if (data.msg) Message.error(data.msg)
					else Message.error('接口请求出错，请联系管理员！')
				}
			}
			return data
		}, (error) => {
			Message.error('服务内部错误')
			// 对响应错误做点什么
			return Promise.reject(error)
		})
	}
	// 创建实例
	create() {
		let conf = {
			baseURL: BASE_URL,
			// timeout: 2000,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'X-URL-PATH': location.pathname
			}
			// withCredentials: true
		}
		return Axios.create(conf)
	}
	// 合并请求实例
	mergeReqest(instances = []) {
		//
	}
	// 请求实例
	request(options) {
		var instance = this.create()
		this.interceptors(instance, options.url)
		options = Object.assign({}, options)
		this.queue[options.url] = instance
		return instance(options)
	}
}
export default httpRequest
