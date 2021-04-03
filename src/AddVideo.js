import {useState, useContext} from 'react'
import { VideosListContext } from './VideosListContext'
import addToStorageVideos from './utilities/addToStorageVideos'

const AddVideo = () => {

const [videoLink, setVideoLink] = useState('')
const [, setVideosData] = useContext(VideosListContext)


const updateVideoLink = (e) => {
    setVideoLink(e.target.value)
}

function youTubeGetIdFromUrl(url){
    var ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
      return ID;
  }



const apiKey = process.env.REACT_APP_YT_API_KEY

const handleAddVideo = (e) => {
    e.preventDefault()
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${youTubeGetIdFromUrl(videoLink)}&key=${apiKey}&part=snippet,statistics`
    fetch(url)
    .then(res => (res.json()))
    .then(data => {
    addToStorageVideos(data, setVideosData)
    setVideoLink('');
    })
}  
    return (
        <form onSubmit={handleAddVideo}>
            <input value={videoLink} onChange={updateVideoLink} type="text"/>
            <button>add</button>
        </form> 
     );
}
 
export default AddVideo;