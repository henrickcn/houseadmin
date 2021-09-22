import {LOGIN, ROUTES, LOGINSMS,LOGINSENDSMS} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password, agreet) {
  return request(LOGIN, METHOD.POST, {
    phone: name,
    password: password,
    agreet: agreet,
    type: 'pc'
  })
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}

/**
 * 发送登录验证码
 * @param {*} token 临时登录态
 * @param {*} companyId 所属公司ID
 * @returns 
 */
export async function sendSms(token, companyId) {
  return request(LOGINSENDSMS, METHOD.POST, {
    token: token,
    company_id: companyId
  })
}

/**
 * 短信验证码登录
 * @param {*} token 临时登录态
 * @param {*} code 验证码
 * @returns 
 */
export async function loginSms(token, code) {
  return request(LOGINSMS, METHOD.POST, {
    token: token,
    sms_code: code
  })
}

export default {
  login,
  logout,
  getRoutesConfig,
  sendSms,
  loginSms
}
