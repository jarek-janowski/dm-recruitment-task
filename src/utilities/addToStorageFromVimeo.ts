const addToStorageFromVimeo = (data: any, setVideosData: any) => {
    const arr = JSON.parse(localStorage.getItem('videosData')!) || [];
  
    const date = (new Date(Date.now()).toLocaleString().split(',')[0])
  
    arr.push({
      date: date,    
      id: data.data[0].uri,
      snippet: {
        title: data.data[0].name,
        thumbnails: {
          medium: {
            url: data.data[0].pictures.sizes[3].link
          } }
      },
      statistics: {
        likeCount: data.data[0].metadata.connections.likes.total,
        viewCount: "no available data",
      },
    })
    localStorage.setItem('videosData', JSON.stringify(arr))
    const retrievedObject = localStorage.getItem('videosData')!
    setVideosData(JSON.parse(retrievedObject))
  };

  export default addToStorageFromVimeo