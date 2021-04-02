import {useState, useContext} from 'react'
import { VideosListContext } from './VideosListContext'

const AddVideo = () => {

const [videoLink, setVideoLink] = useState('')
const [, setVideosData] = useContext(VideosListContext)


const updateVideoLink = (e) => {
    setVideoLink(e.target.value)
}
const apiKey = process.env.REACT_APP_YT_API_KEY

function youTubeGetID(url){
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


const handleAddVideo = (e) => {
    e.preventDefault()
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${youTubeGetID(videoLink)}&key=${apiKey}&part=snippet,statistics`
    fetch(url)
    .then(res => (res.json()))
    .then(data => setVideosData(prev => [...prev, ...data.items]))
}
    return (
        <form onSubmit={handleAddVideo}>
            <input value={videoLink} onChange={updateVideoLink} type="text"/>
            <button>add</button>
        </form> 
     );
}
 
export default AddVideo;