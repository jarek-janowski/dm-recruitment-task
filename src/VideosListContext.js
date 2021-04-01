import { useState, useEffect, createContext } from 'react'

export const VideosListContext = createContext();

export const VideosListProvider = (props) => {
  const [videosData, setVideosData] = useState([]);

  const apiKey = process.env.REACT_APP_YT_API_KEY

  const id= "eDQvN48XQ5k";
  const id2="dGOoeAIz2dU";
  const id3= "r50mrMgPkuc";

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet,statistics`
  const apiUrl2 = `https://www.googleapis.com/youtube/v3/videos?id=${id2}&key=${apiKey}&part=snippet,statistics`
  const apiUrl3 = `https://www.googleapis.com/youtube/v3/videos?id=${id3}&key=${apiKey}&part=snippet,statistics`

  useEffect(() => {
    const apiUrls = [apiUrl, apiUrl2, apiUrl3]
    if(!videosData.length){
    Promise.all(apiUrls.map(url =>
      fetch(url).then(res => res.json())
      .then(data=> setVideosData(oldData => [...oldData, ...data.items]))
      ))
    }
  },[apiUrl, apiUrl2, apiUrl3, videosData.length]);

  return (
    <VideosListContext.Provider value={[videosData, setVideosData]}>
      {props.children}
    </VideosListContext.Provider>
  );
}