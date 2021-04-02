import VideosList from './VideosList'
import AddVideo from './AddVideo'
import { VideosListProvider } from './VideosListContext'

import './App.css';

const App = () => {

  return (
    <VideosListProvider>
      <div className="app">
        <h1>Video-App</h1>
        <AddVideo />
        <VideosList />
      </div>
    </VideosListProvider>
  );
}

export default App;

