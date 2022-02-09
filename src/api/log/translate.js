import service from "../../utils/request"

/**
 * @returns 
 */
export function translateList(moduleKey, clientType, translateState, orderType, searchKey, mergeStatus, page, size,searchType) {
  return service.request({
    method: "post",
    url: "admin/translate/list",
    data: {
      moduleKey: moduleKey,
      clientType: clientType,
      translateState: translateState,
      orderType: orderType,
      searchKey: searchKey,
      mergeStatus: mergeStatus,
      page: page,
      size: size,
      searchType: searchType
    }
  })
}

/**
 * 翻译内容
 * @param  content 
 * @returns 
 */
export function translateContent(content) {
  return service.request({
    method: "get",
    url: "https://www.mxnzp.com/api/convert/translate/base64?content=" + window.btoa(unescape(encodeURIComponent(content))) + "&from=zh&to=en&app_id=xgjftdiauwetheop&app_secret=NlBselBJVUdDOVZKKyt5MXU0Ym5lUT09",
    data: {

    }
  })
}

/**
 * @returns 
 */
export function translateSplit(id) {
  return service.request({
    method: "post",
    url: "admin/translate/split",
    data: {
      id: id
    }
  })
}

/**
 * @returns 
 */
export function translateDelete(id) {
  return service.request({
    method: "post",
    url: "admin/translate/delete",
    data: {
      id: id
    }
  })
}

/**
 * @returns 
 */
export function translateMerge(fromId, toId) {
  return service.request({
    method: "post",
    url: "admin/translate/merge",
    data: {
      fromId: fromId,
      toId: toId
    }
  })
}

/**
 * @returns 
 */
 export function translateConfirm(id, status) {
  return service.request({
    method: "post",
    url: "admin/translate/confirm",
    data: {
      id: id,
      status: status
    }
  })
}

/**
 * @returns 
 */
export function translateDownloadTools() {
  return service.request({
    method: "post",
    url: "admin/translate/tools/download",
    data: {}
  })
}


/**
 * @returns 
 */
export function translateEdit(id, translate) {
  return service.request({
    method: "post",
    url: "admin/translate/edit",
    data: {
      id: id,
      translate: translate
    }
  })
}

/**
 * @returns 
 */
export function translateModules() {
  return service.request({
    method: "post",
    url: "admin/translate/modules",
    data: {}
  })
}


/**
 * @returns 
 * 更新远程module列表
 */
export function translateUpdateModulesList() {
  return service.request({
    method: "post",
    url: "admin/translate/modules/update/list",
    data: {}
  })
}

/**
 * @returns 
 * 更新module
 */
export function translateUpdateModules(id, label) {
  return service.request({
    method: "post",
    url: "admin/translate/modules/update",
    data: {
      id: id,
      label: label
    }
  })
}

/**
 * @returns 
 */
export function translateLog(translateId) {
  return service.request({
    method: "post",
    url: "admin/translate/log/list",
    data: {
      translateId: translateId
    }
  })
}

/**
 * @returns 重置token
 */
 export function resetToken() {
  return service.request({
    method: "post",
    url: "admin/translate/user/resettoken",
    data: {

    }
  })
}

/**
 * @returns 修改密码
 */
 export function changePsw(password) {
  return service.request({
    method: "post",
    url: "admin/translate/user/changepsw",
    data: {
      password: password
    }
  })
}