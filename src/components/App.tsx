import VideosList from './VideosList/VideosList'
import AddVideo from './AddVideo/AddVideo'
import { VideosListProvider } from '../contexts/VideosListContext'
import { Container } from 'reactstrap'

import './App.css';

const App = () => {

  return (
    <VideosListProvider>
      <Container>
      <div className="app">
        <h1>Video App</h1>
        <AddVideo />
        <VideosList />
      </div>
      </Container>
    </VideosListProvider>
  );
}

export default App;

