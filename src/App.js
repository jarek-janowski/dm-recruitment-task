import VideosList from './VideosList'
import { VideosListProvider } from './VideosListContext'

import './App.css';

const App = () => {
  return (
    <VideosListProvider>
      <div className="app">
        <h1>Video-App</h1>
        <VideosList />
      </div>
    </VideosListProvider>
  );
}

export default App;

