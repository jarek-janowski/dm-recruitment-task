import './VideoListItem.scss'

const VideoListItem = ({
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
    display
}) => {
  
    const handleShowModalOnClick = () => {
        onSelect(id)
        toggleModal()
      
    }
 
    const addDate = (new Date(Date.now()).toLocaleString().split(',')[0])

    return(
      <>
      <li>
        <div className={display? "list-item" : ""}>
          <img onClick={handleShowModalOnClick} className="list-item__img" src={thumbnail} alt={`${title} thumbnail`}/>
          <h2 onClick={handleShowModalOnClick} className="list-item__heading">{title}</h2>
          <p className="list-item__numbers">Views: {views}</p>
          <p className="list-item__numbers">Likes: {likes}</p>
          <p className="list-item__numbers">Added: {addDate}</p>
          <button className="list-item__remove" onClick={() => removeVideo(id)}>🗑</button>
          <button className="list-item__fav" onClick={() => addToFavourites(video)}>🖤</button>
        </div>
      </li>
      
      </>
    )
  }

  export default VideoListItem