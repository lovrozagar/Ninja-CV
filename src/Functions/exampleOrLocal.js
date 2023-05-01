function exampleOrLocal(example, id) {
  const storedData = JSON.parse(localStorage.getItem('sections'))?.find(
    (section) => section.id === id
  )?.content

  if (!storedData) return example

  return storedData
}

export default exampleOrLocal
