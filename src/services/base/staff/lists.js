import {BASESTAFFLIST} from '@/services/api'
import {request, METHOD} from '@/utils/request'
/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
 export async function getList(data) {
  return request(BASESTAFFLIST, METHOD.POST, data||{})
}

export default {
  getList
}