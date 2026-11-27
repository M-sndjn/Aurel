
import { createContext, useContext, useState, useEffect } from 'react'

const SavedPropertiesContext = createContext()

export function SavedPropertiesProvider({ children }) {
  const [savedProperties, setSavedProperties] = useState(() => {
    const storedProperties = localStorage.getItem('savedProperties')
    return storedProperties ? JSON.parse(storedProperties) : []
  })

  useEffect(() => {
    localStorage.setItem('savedProperties', JSON.stringify(savedProperties))
  }, [savedProperties])

  const toggleSaved = (listingId) => {
    setSavedProperties((previousSaved) => {
      if (previousSaved.includes(listingId)) {
        return previousSaved.filter((id) => id !== listingId)
      }

      return [...previousSaved, listingId]
    })
  }

  const isSaved = (listingId) => savedProperties.includes(listingId)

  return (
    <SavedPropertiesContext.Provider
      value={{ savedProperties, toggleSaved, isSaved }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  )
}

export function useSavedProperties() {
  return useContext(SavedPropertiesContext)
}
