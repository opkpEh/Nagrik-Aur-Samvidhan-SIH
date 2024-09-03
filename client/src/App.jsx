import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import Quiz from './screens/Quiz';
import LearnScreen from './screens/LearnScreen';
import PlayScreen from './screens/PlayScreen';
export default function App() {

  
  return (
     <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learning" element={<LearnScreen />} />
          <Route path="/play" element={<PlayScreen />} />
          <Route path="/quiz" element={<Quiz />} />
          {/* <Route path="/play" element={<PlayPage />} /> */}
        </Routes>
      </div>
    </Router>
  )
}
