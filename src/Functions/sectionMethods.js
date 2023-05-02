function saveAppData(newData) {
  localStorage.setItem('sections', JSON.stringify(newData))
}

function saveDataSimple({ setter, id, content }) {
  setter((prev) => {
    const updatedSections = prev.map((section) =>
      section.id === id ? { ...section, content: content } : section
    )
    localStorage.setItem('sections', JSON.stringify(updatedSections))
    return updatedSections
  })
}

function saveDataComplex({ setter, id, title, content }) {
  setter((prev) => {
    const updatedSections = prev.map((section) =>
      section.id === id
        ? { ...section, title: title, content: content }
        : section
    )
    localStorage.setItem('sections', JSON.stringify(updatedSections))
    return updatedSections
  })
}

export { saveAppData, saveDataSimple, saveDataComplex }
