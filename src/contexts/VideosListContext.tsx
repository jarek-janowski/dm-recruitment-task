import { useState, createContext } from 'react'

export const VideosListContext = createContext([] as any)

export const VideosListProvider = (props: any) => {
  const [videosData, setVideosData] = useState([]);
  return (
    <VideosListContext.Provider value={[videosData, setVideosData]}>
      {props.children}
    </VideosListContext.Provider>
  );
}