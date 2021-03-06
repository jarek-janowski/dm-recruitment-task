import React, { useState, useContext } from 'react'
import { VideosListContext } from '../../contexts/VideosListContext'
import addToStorageFromYt from '../../utilities/addToStorageFromYt'
import addToStorageFromVimeo from '../../utilities/addToStorageFromVimeo'
import youTubeGetIdFromUrl from '../../utilities/youTubeGetIdFromUrl'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import './AddVideo.scss';

const AddVideo = () => {

const [videoLink, setVideoLink] = useState('')
const [videosData, setVideosData] = useContext(VideosListContext)

const updateVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(e.target.value)
}

const apiKey = process.env.REACT_APP_YT_API_KEY
const vimeoApiKey = process.env.REACT_APP_VIMEO_API_KEY


const mapVideosData = videosData!== null && videosData.map((video: any) => (
  video.id
))

const fetchData = (
    url: string, 
    addToStorage: (data: any, setVideosData: any) => any, 
    setVideosData: any
  ) => {
  fetch(url)
  .then(res => {
    if(res.ok){
      res.json()
      .then(data => {
        if(data.data !== undefined){
          const includesVimeo = mapVideosData.includes(data.data[0].uri)
          !includesVimeo 
          ? (data.data.length ? addToStorage(data, setVideosData) : alert('wrong link')) 
          : alert('Video is already in library')
        }
        if(data.items !== undefined){
          const includesYt =  mapVideosData.includes(data.items[0].id)
          !includesYt
          ? (data.items.length ? addToStorage(data, setVideosData) : alert('wrong link'))
          : alert('Video is already in library')
        }
      })
    }
  })
}

const handleAddVideo = (e: React.FormEvent) => {
  e.preventDefault()
  if(videoLink.includes('vimeo')){
    const url = `https://api.vimeo.com/videos?access_token=${vimeoApiKey}&links=${videoLink}`
    fetchData(url, addToStorageFromVimeo, setVideosData)
  } else {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${youTubeGetIdFromUrl(videoLink)}&key=${apiKey}&part=snippet,statistics`
    fetchData(url, addToStorageFromYt, setVideosData)
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