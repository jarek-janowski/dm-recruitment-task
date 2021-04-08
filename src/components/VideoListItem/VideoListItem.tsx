import React from 'react'
import './VideoListItem.scss'

interface Props {
  video: any,
  title: string,
  thumbnail: string,
  views: string,
  likes: string,
  id: string,
  onSelect: (id: string) => void,
  toggleModal: () => void,
  removeVideo: (id: string) => void,
  addToFavourites: (video: any) => void,
  display: boolean,
  date: string,
  currentFilter: boolean
}

const VideoListItem: React.FC<Props> = ({
    video,
    title, 
    thumbnail, 
    views, 
    likes, 
    id, 
    onSelect, 
    toggleModal,
    removeVideo,
    addToFavourites,
    display,
    date,
    currentFilter
}) => {
  
    const handleShowModalOnClick = () => {
        onSelect(id)
        toggleModal()
      
    }
    
    return(
      <>
      <li>
        <div className={display? "list-item" : ""}>
          <img onClick={handleShowModalOnClick} className="list-item__img" src={thumbnail} alt={`${title} thumbnail`}/>
          <h2 className={ display ? "list-item__heading" : "list-item__heading--tiles"}>{title}</h2>
          <p className="list-item__numbers">Views: {views}</p>
          <p className="list-item__numbers">Likes: {likes}</p>
          <p className="list-item__numbers">Added: {date}</p>
          <button className="list-item__play"onClick={handleShowModalOnClick}>▶</button>
          <button className="list-item__remove" onClick={() => removeVideo(id)}>🗑</button>
          {currentFilter && <button className="list-item__fav" onClick={() => addToFavourites(video)}>❤</button>}
        </div>
      </li>
      
      </>
    )
  }

  export default VideoListItem