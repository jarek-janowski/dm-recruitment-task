const addToStorageFavourites = (selectedVideo: any, setFavourites: any) => {
    const arr = JSON.parse(localStorage.getItem('favourites')!) || [];
    
    const date = (new Date(Date.now()).toLocaleString().split(',')[0])
    
    arr.push({
        date: date,    
        id: selectedVideo.id,
        snippet: {
        title: selectedVideo.snippet.title,
        thumbnails: {
            medium: {
            url: selectedVideo.snippet.thumbnails.medium.url
            } }
        },
        statistics: {
        likeCount: selectedVideo.statistics.likeCount,
        viewCount: selectedVideo.statistics.viewCount,
        },
    })
    localStorage.setItem('favourites', JSON.stringify(arr))
    const retrievedObject = localStorage.getItem('favourites')!
    setFavourites(JSON.parse(retrievedObject))
    }
 
export default addToStorageFavourites;