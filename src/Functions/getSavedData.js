function getAppData(example) {
  const storedData = JSON.parse(localStorage.getItem('sections'))

  if (!storedData) return example

  return storedData
}

function getTitleData(defaultTitle, id) {
  const storedData = JSON.parse(localStorage.getItem('sections'))?.find(
    (section) => section.id === id
  )?.title

  if (!storedData) return defaultTitle

  return storedData
}

function getSectionData(example, id) {
  const storedData = JSON.parse(localStorage.getItem('sections'))?.find(
    (section) => section.id === id
  )?.content

  if (!storedData) return example

  return storedData
}

export { getAppData, getTitleData, getSectionData }
