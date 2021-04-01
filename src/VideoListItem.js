
const VideoListItem = ({
    title, 
    thumbnail, 
    views, 
    likes, 
    id, 
    onSelect, 
    toggleModal
}) => {
  
    const handleShowModalOnClick = () => {
        onSelect(id)
        toggleModal()
      
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

  export default VideoListItem