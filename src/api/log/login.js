import service from "../../utils/request"

// 用户登录接口
export function adminLogin(username, psw) {
    return service.request({
        method: "post",
        url: "admin/translate/user/login",
        data: {
            userName: username,
            password: psw
        }
    })
}