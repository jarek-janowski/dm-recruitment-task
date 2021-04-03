import { useState, useContext } from 'react'
import { VideosListContext } from './VideosListContext'
import addToStorageVideos from './utilities/addToStorageVideos'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import './AddVideo.scss';

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
        <Form className="form" onSubmit={handleAddVideo}>
          <FormGroup>
            <Label>Link: </Label>
            <Input 
              value={videoLink} 
              onChange={updateVideoLink} 
              type="text"
              placeholder="ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
            <Button color="primary" block style={{width: '50%', margin: '8px auto'}}>Add video</Button>
          </FormGroup>
        </Form> 
     );
}
 
export default AddVideo;