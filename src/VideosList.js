import { useContext, useState, useEffect } from 'react';

import VideoListItem from './VideoListItem';
import FavouritesListItem from './FavouritesListItem';
import ExampleVideos from './ExampleVideos';
import VideoModal from './VideoModal';
import Pagination from './Pagination';
import { VideosListContext } from './VideosListContext';
import { setVideosDataFromLocaleStorage,  setFavouritesFromLocaleStorage } from './utilities/setStateFromLocaleStorage';
import addToFavourites from './utilities/addToFavourites';

import './VideoList.scss'

const VideosList = () => {

  const [videosData, setVideosData] = useContext(VideosListContext)
  const [modal, setModal] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [display, setDisplay] = useState(true);
  const [favourites, setFavourites] = useState([])
  const [currentFilter, setCurrentFilter] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(6);
  
  //
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videosData.slice(indexOfFirstVideo, indexOfLastVideo)
  const currentFavourites = favourites.slice(indexOfFirstVideo, indexOfLastVideo)

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
    const filtered = videosData.filter(video => {
      return video.id !== selectedVideo
    })
    setVideosDataFromLocaleStorage(filtered, setVideosData);
  }

  const handleRemoveVideoFromFavourites = (selectedVideo) => {
    const filtered = favourites.filter(fav => {
      return fav.id !== selectedVideo
    })
    setFavouritesFromLocaleStorage(filtered, setFavourites);
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

  const handleSetFilter = () => {
    setCurrentFilter(!currentFilter)
    setCurrentPage(1);
  }

  const handleSortList = () => {
    if(currentFilter){
      setVideosData([...videosData].reverse());
    }else {
      setFavourites([...favourites].reverse());
    }
  }

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return ( 
    <>
      {videosData === null || !videosData.length ? "" :
        <div>
          <button onClick={handleCleanAllVideos}>clean</button>
          <button onClick={handleChangeListToTiles}>change display</button>
          <button onClick={handleSortList}>sort</button>
        </div> 
      }
      <button onClick={handleSetFilter}>{currentFilter ? "fav" : "all"}</button>
      <ul>
        <div className={display ? "" : "tiles"}>
        {videosData === null || !videosData.length 
        ? <ExampleVideos/> 
        : currentFilter && currentVideos.map(video => (
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
        {!currentFilter && currentFavourites.map(fav => (
            <FavouritesListItem 
              key= {fav.id}
              fav={fav}
              title={fav.snippet.title}
              thumbnail={fav.snippet.thumbnails.medium.url}
              views={fav.statistics.viewCount}
              likes={fav.statistics.likeCount}
              id={fav.id}
              onSelect={(selectedVideo) => setVideoId(selectedVideo)}
              toggleModal={handleToggleModal}
              removeVideo={handleRemoveVideoFromFavourites}
              addToFavourites={handleAddToFavourites}
              display={display}
            />
          ))
        } 
        </div> 
    </ul>
    <Pagination 
      videosPerPage={videosPerPage} 
      totalVideos={videosData.length}
      paginate={paginate}
      totalFavourites={favourites.length}
      currentFilter={currentFilter}
    />
    <VideoModal 
      modal={modal}
      toggleModal={handleToggleModal}
      videoId={videoId}
    />
  </> 
    );
  }

  export default VideosList