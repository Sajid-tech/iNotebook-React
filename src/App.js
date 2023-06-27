import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>

          <Navbar />
          <Alert message='This is amazing react js project' />
          <div className="container">
            <Routes>
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/about' element={<About />} />


            </Routes>
          </div>




        </Router>
      </NoteState>

    </>
  );
}

export default App;
