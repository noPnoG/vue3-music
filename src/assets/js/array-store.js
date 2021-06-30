import storage from 'good-storage'

function insertArray (arr, val, compare, maxlen) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    return
  }
  arr.unshift(val)
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
export function save (item, key, compare, maxlen) {
  const items = storage.get(key, [])
  insertArray(items, item, compare, maxlen)
  storage.set(key, items)
  return items
}

export function remove (key, compare) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

export function load (key) {
  return storage.get(key, [])
}