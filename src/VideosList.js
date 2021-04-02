import { useContext, useState, useEffect } from 'react';

import VideoListItem from './VideoListItem'
import ExampleVideos from './ExampleVideos'
import VideoModal from './VideoModal'
import { VideosListContext } from './VideosListContext'
import setVideosDataFromLocaleStorage from './utilities/setVideosDataFromLocaleStorage'

import './VideoList.scss'

const VideosList = () => {

  const [videosData, setVideosData] = useContext(VideosListContext)
  const [modal, setModal] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const retrievedObject = localStorage.getItem('videosData')
    if(retrievedObject===null){
      localStorage.setItem('videosData', JSON.stringify([]))
    }
    setVideosData(JSON.parse(retrievedObject))
  }, [setVideosData]);


  const handleToggleModal = () => {
    setModal(!modal);
  }

  const handleRemoveVideo = (selectedVideo) => {
    const filtered = videosData.filter(el => {
      return el.id !== selectedVideo
    })
    setVideosDataFromLocaleStorage(filtered, setVideosData);
  }

  const handleCleanAllVideos = () => {
    setVideosDataFromLocaleStorage([], setVideosData);
  }
  
  const handleChangeDisplay = () => {
    setDisplay(!display);
  }

  return ( 
    <>
    {videosData === null || !videosData.length ? "" : <button onClick={handleCleanAllVideos}>clean</button>}
    {videosData === null || !videosData.length ? "" : <button onClick={handleChangeDisplay}>change display</button>}
    <ul>
      <div className={display ? "" : "tiles"}>
      {videosData === null || !videosData.length ? <ExampleVideos/> : videosData.map(video => (
          <VideoListItem key={video.id}
            title={video.snippet.title}
            thumbnail={video.snippet.thumbnails.medium.url}
            views={video.statistics.viewCount}
            likes={video.statistics.likeCount}
            id={video.id}
            onSelect={(selectedVideo) => setVideoId(selectedVideo)}
            toggleModal={handleToggleModal}
            removeVideo={handleRemoveVideo}
            display={display}
          />
        ))
      }
      </div> 
  </ul>
  <VideoModal 
  modal={modal}
  toggleModal={handleToggleModal}
  videoId={videoId}
  />
  </> 
    );
  }

  export default VideosList