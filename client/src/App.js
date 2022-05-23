import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Topbar from './components/Topbar/Topbar';

function App() {
  return (
    <Router>
      <div className='App flex justify-center items-center h-screen'>
        <div className='bg-gradient-to-tr from-[#BF80E2] to-[#852cfa] rounded-[44px] h-[844px] w-[390px]'>
          <Topbar />
          <div className=''>
            <div>
              <Routes>
                <Route exact path='/' element={<Welcome />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/home' element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
