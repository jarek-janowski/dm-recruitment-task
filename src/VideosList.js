import { useContext, useState } from 'react';

import VideoListItem from './VideoListItem'
import VideoModal from './VideoModal'
import { VideosListContext } from './VideosListContext'

const VideosList = () => {

    const [videosData] = useContext(VideosListContext)
    const [modal, setModal] = useState(false);
    const [videoId, setVideoId] = useState('')
  
    const handleToggleModal = () => {
      setModal(!modal);
    } 

    return ( 
      <ul>
        {videosData.map(video => (
            <VideoListItem key={video.id}
              title={video.snippet.title}
              thumbnail={video.snippet.thumbnails.medium.url}
              views={video.statistics.viewCount}
              likes={video.statistics.likeCount}
              id={video.id}
              onSelect={(selectedVideo) => setVideoId(selectedVideo)}
              toggleModal={handleToggleModal}
            />
          ))}
        <VideoModal 
          modal={modal}
          toggleModal={handleToggleModal}
          videoId={videoId}
        />
      </ul>
     );
  }

  export default VideosList