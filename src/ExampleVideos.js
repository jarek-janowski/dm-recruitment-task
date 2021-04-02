import { useContext } from 'react';
import { VideosListContext } from './VideosListContext'
import addToStorage from './utilities/addToStorage'


const ExampleVideos = () => {
    const [, setVideosData] = useContext(VideosListContext)
    const apiKey = process.env.REACT_APP_YT_API_KEY
  
    const id= "eDQvN48XQ5k";
    const id2="dGOoeAIz2dU";
    const id3= "r50mrMgPkuc";
  
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet,statistics`
    const apiUrl2 = `https://www.googleapis.com/youtube/v3/videos?id=${id2}&key=${apiKey}&part=snippet,statistics`
    const apiUrl3 = `https://www.googleapis.com/youtube/v3/videos?id=${id3}&key=${apiKey}&part=snippet,statistics`
  
    const handleAddExampleVideosOnClick = () => {
      const apiUrls = [apiUrl, apiUrl2, apiUrl3]
      Promise.all(apiUrls.map(url =>
        fetch(url).then(res => res.json())
        .then(data=> {
            addToStorage(data, setVideosData)
        })
        ))
    }
    return(
    <button onClick={handleAddExampleVideosOnClick}>Add example videos</button>
    )
  }

  export default ExampleVideos