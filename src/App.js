import './App.css';
import {ToastContainer} from 'react-toastify';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'

// views
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer/>
        <NavBar/>
        <Routes>
          <Route path="/signup" element={<SignupView/>} />
          <Route path="/login" element={<LoginView/>} />
          <Route path="/" element={<HomeView/>} />
        </Routes>
      </BrowserRouter>

        
    </div>
  );
}

export default App;
