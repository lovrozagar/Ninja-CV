function deepCompareValue(obj1, obj2) {
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  if (
    obj1 === null ||
    obj2 === null ||
    obj1 === undefined ||
    obj2 === undefined
  ) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false
    }

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      if (!deepCompareValue(value1, value2)) {
        return false
      }
    } else if (value1 !== value2) {
      return false
    }
  }

  return true
}

export default deepCompareValue
