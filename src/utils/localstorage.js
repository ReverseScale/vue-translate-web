export default {
  getStorage(key) {
    let content = window.localStorage.getItem(key)
    if (!content || content == "") {
      return ""
    }
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch (e) {
      return content
    }
  },
  saveStorage(key, value) {
    try {
      let json = JSON.stringify(value)
      window.localStorage.setItem(key, json)
    } catch (e) {
      window.localStorage.setItem(key, value)
    }
  },
  removeStorage(key) {
    try {
      window.localStorage.removeItem(key)
    } catch (e) {

    }
  }
}
