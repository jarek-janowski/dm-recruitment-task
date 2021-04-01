import { useState, useEffect } from 'react'
import './App.css';

const VideoListItem = ({title, thumbnail, views, likes}) => {
  return(
    <li>
      <h2>{title}</h2>
      <img src={thumbnail} alt={`${title} thumbnail`}/>
      <p>Views: {views}</p>
      <p>Likes: {likes}</p>
    </li>
  )
  
}

const VideosList = ({videos}) => {
  return ( 
    <ul>
      {videos.map(video => (
        <VideoListItem key={video.id}
          title={video.snippet.title}
          thumbnail={video.snippet.thumbnails.medium.url}
          views={video.statistics.viewCount}
          likes={video.statistics.likeCount}
        />
        ))}
    </ul>
   );
}


const App = () => {

  const [videoData, setVideoData] = useState([]);

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
  return (
    <div className="app">
      👋
      <VideosList videos={videoData}/>
    </div>
  );
}

export default App;

