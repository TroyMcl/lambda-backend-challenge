export const flattenObjectValueKeyOrder = <T>(obj: T): string[] => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof T]

    if (Array.isArray(value)) {
      if (value.length < 1) {
        acc.push(key)
      } else {
        const subValues = value.map((item) => `${item} ${key}`)
        acc.push(...subValues)
      }
    } else {
      acc.push(`${value} ${key}`)
    }
    return acc
  }, [] as string[])
}
