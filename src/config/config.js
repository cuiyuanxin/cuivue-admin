/**
 * 设置公共变量信息
 */
console.log()
// 默认站点title
export const TITLE = 'cuivue-admin'
// api接口地址
export const BASE_URL = process.env.NODE_ENV == 'production' ? 'http://admin.cuiyuanxin.com' : 'http://admin.cuicmf.com'
// token key
export const TOKEN_KEY = 'cuivue-admin-token'
// 未登录默认跳转路由地址
export const LOGIN_PAGE_NAME = 'login'
// 登录后默认跳转路由地址
export const HOME_PAGE_NAME = 'home'
