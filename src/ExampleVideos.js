import { useContext } from 'react';
import { Button } from 'reactstrap';
import { VideosListContext } from './VideosListContext'
import addToStorageVideos from './utilities/addToStorageVideos'


const ExampleVideos = () => {
  const [, setVideosData] = useContext(VideosListContext)
    const apiKey = process.env.REACT_APP_YT_API_KEY

    

    const id= "eDQvN48XQ5k";
    const id2="dGOoeAIz2dU";
    const id3="r50mrMgPkuc";
    const id4="H30R1BUpRF8";
    const id5="bApv-qiHRwI";
    const id6="zUwwPLtLdLM";
    const id7="P4E9Cl6zPvA";
    const id8="ri0HxHrSXyc";
    const id9="_W0H5XLcNW0";
    const id10="NBlSYkIJbIg";

  
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet,statistics`
    const apiUrl2 = `https://www.googleapis.com/youtube/v3/videos?id=${id2}&key=${apiKey}&part=snippet,statistics`
    const apiUrl3 = `https://www.googleapis.com/youtube/v3/videos?id=${id3}&key=${apiKey}&part=snippet,statistics`
    const apiUrl4 = `https://www.googleapis.com/youtube/v3/videos?id=${id4}&key=${apiKey}&part=snippet,statistics`
    const apiUrl5 = `https://www.googleapis.com/youtube/v3/videos?id=${id5}&key=${apiKey}&part=snippet,statistics`
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/videos?id=${id6}&key=${apiKey}&part=snippet,statistics`
    const apiUrl7 = `https://www.googleapis.com/youtube/v3/videos?id=${id7}&key=${apiKey}&part=snippet,statistics`
    const apiUrl8 = `https://www.googleapis.com/youtube/v3/videos?id=${id8}&key=${apiKey}&part=snippet,statistics`
    const apiUrl9 = `https://www.googleapis.com/youtube/v3/videos?id=${id9}&key=${apiKey}&part=snippet,statistics`
    const apiUrl10 = `https://www.googleapis.com/youtube/v3/videos?id=${id10}&key=${apiKey}&part=snippet,statistics`
  
    const handleAddExampleVideosOnClick = () => {
      const apiUrls = [apiUrl, apiUrl2, apiUrl3, apiUrl4, apiUrl5, apiUrl6, apiUrl7, apiUrl8, apiUrl9, apiUrl10]
      Promise.all(apiUrls.map(url =>
        fetch(url).then(res => res.json())
        .then(data=> {
            addToStorageVideos(data, setVideosData)
        })
        ))
    }
    return(
    <div style={{marginTop: "50%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <p>There is no single video 😕 Add something or...</p>
      <Button color="info" onClick={handleAddExampleVideosOnClick}>Load example videos</Button>
    </div>
    )
  }

  export default ExampleVideos