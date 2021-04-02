const setVideosDataFromLocaleStorage = (value, setVideosData) => {
    localStorage.setItem('videosData', JSON.stringify(value))
    const retrievedObject = localStorage.getItem('videosData')
    setVideosData(JSON.parse(retrievedObject))
  }

  export default setVideosDataFromLocaleStorage