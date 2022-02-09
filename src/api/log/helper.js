import service from "../../utils/request"

/**
 * 获取app列表
 * @returns 
 */
export function sendDingdingNotice(title, content, accessToken, secret) {
    return service.request({
        method: "post",
        url: "admin/helper/dingtalk/notice",
        data: {
            title: title,
            content: content,
            accessToken: accessToken,
            secret: secret
        }
    })
}