import { useState, useEffect } from 'react'
import { Button, Modal, ModalBody, ModalFooter} from 'reactstrap'
import './App.css';

const VideoModal = ({modal, toggleModal, videoId}) => {
  
  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal} size="lg" contentClassName="custom-modal-style">
        <ModalBody>
          <iframe
            className="iframe" 
            src={`https://www.youtube.com/embed/${videoId}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const VideoListItem = ({title, thumbnail, views, likes, id, onSelect, toggleModal}) => {
  
  const handleShowModalOnClick = () => {
    toggleModal()
    onSelect(id)
  }
  return(
    <li onClick={handleShowModalOnClick}>
      <h2>{title}</h2>
      <img src={thumbnail} alt={`${title} thumbnail`}/>
      <p>Views: {views}</p>
      <p>Likes: {likes}</p>
      
    </li>
  )
}

const VideosList = ({videos, toggleModal, setVideoId}) => {
  return ( 
    <ul>
      {videos.map(video => (
          <VideoListItem key={video.id}
            title={video.snippet.title}
            thumbnail={video.snippet.thumbnails.medium.url}
            views={video.statistics.viewCount}
            likes={video.statistics.likeCount}
            id={video.id}
            onSelect={(selectedVideo) => setVideoId(selectedVideo)}
            toggleModal={toggleModal}
          />
        
        ))}
    </ul>
   );
}

const App = () => {

  const [modal, setModal] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [videoId, setVideoId] = useState('')

  const apiKey = process.env.REACT_APP_YT_API_KEY

  const id= "eDQvN48XQ5k";
  const id2="dGOoeAIz2dU";
  const id3= "r50mrMgPkuc"

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet,statistics`
  const apiUrl2 = `https://www.googleapis.com/youtube/v3/videos?id=${id2}&key=${apiKey}&part=snippet,statistics`
  const apiUrl3 = `https://www.googleapis.com/youtube/v3/videos?id=${id3}&key=${apiKey}&part=snippet,statistics`
  
  useEffect(() => {
    const apiUrls = [apiUrl, apiUrl2, apiUrl3]
    if(!videoData.length){
    Promise.all(apiUrls.map(url =>
      fetch(url).then(res => res.json())
      .then(data=> setVideoData(oldData => [...oldData, ...data.items]))
      ))
    }
    },[apiUrl, apiUrl2, apiUrl3, videoData.length]);


    const handleToggleModal = () => {
      setModal(!modal);
    } 

  return (
    <div className="app">
      <h1>Video-App</h1>
      <VideosList 
        videos={videoData}
        toggleModal={handleToggleModal}
        setVideoId={setVideoId}
      />
      <VideoModal 
        modal={modal}
        toggleModal={handleToggleModal}
        videoId={videoId}
      />
    </div>
  );
}

export default App;

