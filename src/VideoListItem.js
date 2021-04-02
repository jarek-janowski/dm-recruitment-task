
const VideoListItem = ({
    title, 
    thumbnail, 
    views, 
    likes, 
    id, 
    onSelect, 
    toggleModal,
    removeVideo,
}) => {
  
    const handleShowModalOnClick = () => {
        onSelect(id)
        toggleModal()
      
    }
 

    const addDate = (new Date(Date.now()).toLocaleString().split(',')[0])
    return(
      <>
      <li onClick={handleShowModalOnClick}>
        <h2>{title}</h2>
        <img src={thumbnail} alt={`${title} thumbnail`}/>
        <p>Views: {views}</p>
        <p>Likes: {likes}</p>
        <p>Added date: {addDate}</p>
        
      </li>
      <button onClick={() => removeVideo(id)}>remove</button>
      </>
    )
  }

  export default VideoListItem