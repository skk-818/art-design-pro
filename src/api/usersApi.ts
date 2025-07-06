import request from '@/utils/http'

export class UserService {
  // 登录
  static login(params: Api.Auth.LoginParams) {
    return request.post<Api.Auth.LoginResponse>({
      url: '/api/system/auth/login',
      params
      // showErrorMessage: false // 不显示错误消息
    })
  }

  // 获取用户信息
  static getUserInfo() {
    return request.post<Api.User.UserInfo>({
      url: '/api/system/user/info'
    })
  }

  // 获取用户列表
  static getUserList(params: Api.Common.PaginatingParams) {
    return request.post<Api.User.UserListData>({
      url: '/api/system/user/list',
      params
    })
  }
}
