//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/site/login`, //登录
  LOGINSENDSMS: `${BASE_URL}/site/get-sms`, //获取登录验证码
  LOGINSMS:`${BASE_URL}/site/login-sms`, //短信登录

  BASESTAFFLIST:`${BASE_URL}/base/staff/lists`, //管理员账号列表

  ROUTES: `${BASE_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
}
