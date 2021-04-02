const addToFavourites = (selectedVideo, setFavourites) => {
    const arr = JSON.parse(localStorage.getItem('favourites')) || [];
    arr.push({    
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
    const retrievedObject = localStorage.getItem('favourites')
    setFavourites(JSON.parse(retrievedObject))
    }
 
export default addToFavourites;