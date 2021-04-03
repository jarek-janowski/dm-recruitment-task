export const setVideosDataFromLocaleStorage = (value, setVideosData) => {
    localStorage.setItem('videosData', JSON.stringify(value))
    const retrievedObject = localStorage.getItem('videosData')
    setVideosData(JSON.parse(retrievedObject))
  }

export const setFavouritesFromLocaleStorage = (value, setVideosData) => {
  localStorage.setItem('favourites', JSON.stringify(value))
  const retrievedObject = localStorage.getItem('favourites')
  setVideosData(JSON.parse(retrievedObject))
}

