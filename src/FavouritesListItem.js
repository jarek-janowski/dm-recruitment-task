const FavouritesListItem = ({
    title, 
    thumbnail, 
    views, 
    likes, 
    id, 
    onSelect, 
    toggleModal,
    removeVideo,
    display,
    date
}) => {

    const handleShowModalOnClick = () => {
        onSelect(id)
        toggleModal()
      
    }
    return ( 
    <li>
        <div className={display? "list-item" : ""}>
            <img onClick={handleShowModalOnClick} className="list-item__img" src={thumbnail} alt={`${title} thumbnail`}/>
            <h2 onClick={handleShowModalOnClick} className="list-item__heading">{title}</h2>
            <p className="list-item__numbers">Views: {views}</p>
            <p className="list-item__numbers">Likes: {likes}</p>
            <p className="list-item__numbers">Added: {date}</p>
            <button className="list-item__remove" onClick={() => removeVideo(id)}>🗑</button>
        </div>
    </li>
     );
}
 
export default FavouritesListItem;