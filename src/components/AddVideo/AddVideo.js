import { useState, useContext } from 'react'
import { VideosListContext } from '../../contexts/VideosListContext'
import addToStorageFromYt from '../../utilities/addToStorageFromYt'
import addToStorageFromVimeo from '../../utilities/addToStorageFromVimeo'
import youTubeGetIdFromUrl from '../../utilities/youTubeGetIdFromUrl'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import './AddVideo.scss';

const AddVideo = () => {

const [videoLink, setVideoLink] = useState('')
const [, setVideosData] = useContext(VideosListContext)

const updateVideoLink = (e) => {
    setVideoLink(e.target.value)
}

const apiKey = process.env.REACT_APP_YT_API_KEY
const vimeoApiKey = process.env.REACT_APP_VIMEO_API_KEY

const handleAddVideo = (e) => {
  e.preventDefault()
  if(videoLink.includes('vimeo')){
    const url = `https://api.vimeo.com/videos?access_token=${vimeoApiKey}&links=${videoLink}`
    fetch(url)
    .then(res => (res.json()))
    .then(data => {
      addToStorageFromVimeo(data, setVideosData)
    })
  } else {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${youTubeGetIdFromUrl(videoLink)}&key=${apiKey}&part=snippet,statistics`
    fetch(url)
    .then(res => (res.json()))
    .then(data => {
      addToStorageFromYt(data, setVideosData)
    })
  }
  setVideoLink('');
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
            <Button color="primary" block style={{width: '50%', margin: '32px auto'}}>Add video</Button>
          </FormGroup>
        </Form> 
     );
}
 
export default AddVideo;