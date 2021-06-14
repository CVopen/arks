export default function handleLocalSession(method, key, value) {
  switch (method) {
    case 'get':
      if (window.sessionStorage.getItem(key)) return window.sessionStorage.getItem(key)
      return false
    case 'set':
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      window.sessionStorage.setItem(key, value)
      return
    case 'remove': 
      window.sessionStorage.removeItem(key)
      return
    default:
      return false
  }
}