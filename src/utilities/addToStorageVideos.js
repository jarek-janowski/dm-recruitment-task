const addToStorageVideos = (data, setVideosData) => {
  const arr = JSON.parse(localStorage.getItem('videosData')) || [];

  const date = (new Date(Date.now()).toLocaleString().split(',')[0])

  arr.push({
    date: date,    
    id: data.items[0].id,
    snippet: {
      title: data.items[0].snippet.title,
      thumbnails: {
        medium: {
          url: data.items[0].snippet.thumbnails.medium.url
        } }
    },
    statistics: {
      likeCount: data.items[0].statistics.likeCount,
      viewCount: data.items[0].statistics.viewCount,
    },
  })
  localStorage.setItem('videosData', JSON.stringify(arr))
  const retrievedObject = localStorage.getItem('videosData')
  setVideosData(JSON.parse(retrievedObject))
};

export default addToStorageVideos