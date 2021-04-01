import {useState, useContext} from 'react'
import { VideosListContext } from './VideosListContext'

const AddVideo = () => {

const [videoLink, setVideoLink] = useState('')
const [videosData, setVideosData] = useContext(VideosListContext)
console.log(videosData)

const updateVideoLink = (e) => {
    setVideoLink(e.target.value)
}
const apiKey = process.env.REACT_APP_YT_API_KEY


const handleAddVideo = (e) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoLink}&key=${apiKey}&part=snippet,statistics`
    e.preventDefault()
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