export default function handleLocalStorage(method, key, value) {
  switch (method) {
    case 'get':
      const result = window.localStorage.getItem(key)
      if (result) return result
      return false
    case 'set':
      window.localStorage.setItem(key, value)
      break
    case 'remove': 
      window.localStorage.removeItem(key)
      break
    default:
      return false
  }
}