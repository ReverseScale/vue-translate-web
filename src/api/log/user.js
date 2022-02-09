import service from "../../utils/request"

/**
 * 获取用户列表
 * @returns 
 */
export function getUserList(proId, userId, backup, page, size) {
    return service.request({
        method: "post",
        url: "admin/user/list",
        data: {
            proId: proId,
            userId: userId,
            backup: backup,
            page: page,
            size: size
        }
    })
}

/**
 * 更新用户配置
 * @returns 
 */
export function editUserConfig(appId, userId, content, type) {
    return service.request({
        method: "post",
        url: "admin/user/edit",
        data: {
            appId: appId,
            userId: userId,
            content: content,
            type: type
        }
    })
}

/**
 * 删除用户配置
 * @returns 
 */
export function deleteUserConfig(appId, userId) {
    return service.request({
        method: "post",
        url: "admin/user/delete",
        data: {
            appId: appId,
            userId: userId
        }
    })
}

/**
 * 添加用户配置
 * @returns 
 */
export function addUserConfig(proId, userId, backup, cacheDay, countLimit, pageStatistics, launchStatistics, deviceStatistics, uploadNow, onlineDebug) {
    return service.request({
        method: "post",
        url: "admin/user/add",
        data: {
            proId: proId,
            userId: userId,
            backup: backup,
            cacheDay: cacheDay,
            countLimit: countLimit,
            pageStatistics: pageStatistics,
            launchStatistics: launchStatistics,
            deviceStatistics: deviceStatistics,
            uploadNow: uploadNow,
            onlineDebug: onlineDebug
        }
    })
}

/**
 * 搜索设备信息
 * @returns 
 */
export function searchDeviceInfo(userId, appId) {
    return service.request({
        method: "post",
        url: "admin/user/device/info",
        data: {
            appId: appId,
            userId: userId
        }
    })
}

/**
 * 获取ip信息
 * @returns 
 */
export function searchIpInfo(ip) {
    return service.request({
        method: "get",
        baseURL: "https://www.mxnzp.com/",
        url: "api/ip/aim_ip?app_id=xgjftdiauwetheop&app_secret=NlBselBJVUdDOVZKKyt5MXU0Ym5lUT09&ip=" + ip,
        data: {

        }
    })
}