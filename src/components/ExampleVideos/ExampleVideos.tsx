import { useContext } from 'react';
import { Button } from 'reactstrap';
import { VideosListContext } from '../../contexts/VideosListContext'
import addToStorageFromYt from '../../utilities/addToStorageFromYt'


const ExampleVideos = () => {
  const [, setVideosData] = useContext(VideosListContext)
    const apiKey = process.env.REACT_APP_YT_API_KEY

    const ids = [
      "eDQvN48XQ5k", 
      "dGOoeAIz2dU", 
      "r50mrMgPkuc", 
      "H30R1BUpRF8", 
      "bApv-qiHRwI",
      "zUwwPLtLdLM",
      "P4E9Cl6zPvA",
      "ri0HxHrSXyc",
      "_W0H5XLcNW0",
      "NBlSYkIJbIg"
    ]
    const apiUrls = ids.map(id => (
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet,statistics`
    ))
    
    const handleAddExampleVideosOnClick = () => {
      Promise.all(apiUrls.map(url =>
        fetch(url).then(res => res.json())
        .then(data=> {
            addToStorageFromYt(data, setVideosData)
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