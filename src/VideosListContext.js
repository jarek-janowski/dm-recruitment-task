import { useState, createContext } from 'react'

export const VideosListContext = createContext();

export const VideosListProvider = (props) => {
  const [videosData, setVideosData] = useState([]);

  return (
    <VideosListContext.Provider value={[videosData, setVideosData]}>
      {props.children}
    </VideosListContext.Provider>
  );
}