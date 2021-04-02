import { useContext, useState, useEffect } from 'react';

import VideoListItem from './VideoListItem'
import ExampleVideos from './ExampleVideos'
import VideoModal from './VideoModal'
import { VideosListContext } from './VideosListContext'
import setVideosDataFromLocaleStorage from './utilities/setVideosDataFromLocaleStorage'
import addToFavourites from './utilities/addToFavourites'

import './VideoList.scss'

const VideosList = () => {

  const [videosData, setVideosData] = useContext(VideosListContext)
  const [modal, setModal] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [display, setDisplay] = useState(true);
  const [favourites, setFavourites] = useState([])
  
  console.log(favourites)

  useEffect(() => {
    const videosDataStorage = localStorage.getItem('videosData');
    const favouritesStorage = localStorage.getItem('favourites');
    if(videosDataStorage===null){
      localStorage.setItem('videosData', JSON.stringify([]));
    }
    if(favouritesStorage===null){
      localStorage.setItem('favourites', JSON.stringify([]));
    }
    setVideosData(JSON.parse(videosDataStorage));
    setFavourites(JSON.parse(favouritesStorage));
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

  const handleAddToFavourites = (selectedVideo) => {
    addToFavourites(selectedVideo, setFavourites)
  }

  const handleCleanAllVideos = () => {
    setVideosDataFromLocaleStorage([], setVideosData);
  }

  const handleChangeListToTiles = () => {
    setDisplay(!display);
  }

  return ( 
    <>
    {videosData === null || !videosData.length ? "" : <button onClick={handleCleanAllVideos}>clean</button>}
    {videosData === null || !videosData.length ? "" : <button onClick={handleChangeListToTiles}>change display</button>}
    <ul>
      <div className={display ? "" : "tiles"}>
      {videosData === null || !videosData.length ? <ExampleVideos/> : videosData.map(video => (
          <VideoListItem 
            key={video.id}
            video={video}
            title={video.snippet.title}
            thumbnail={video.snippet.thumbnails.medium.url}
            views={video.statistics.viewCount}
            likes={video.statistics.likeCount}
            id={video.id}
            onSelect={(selectedVideo) => setVideoId(selectedVideo)}
            toggleModal={handleToggleModal}
            removeVideo={handleRemoveVideo}
            addToFavourites={handleAddToFavourites}
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