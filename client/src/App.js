import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='bg-[#A3BBCF] rounded-[44px] h-[844px] w-[390px]'>
          <Topbar />
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
