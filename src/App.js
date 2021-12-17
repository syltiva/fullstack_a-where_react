import './App.css';
import {ToastContainer} from 'react-toastify';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'

// views
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView'
import AddPostView from './views/AddPostView'
import EditPostView from './views/EditPostView'
import PostDetailsView from './views/PostDetailsView';
import AuthRoute from './components/AuthRoute'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer/>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomeView/>} />
          <Route path="/signup" element={<SignupView/>} />
          <Route path="/login" element={<LoginView/>} />
          <Route path="/incidentdetails/:id" element={<PostDetailsView/>} />
          
          
          <Route element={<AuthRoute/>}>
            <Route path="/addincident" element={<AddPostView/>} />
            <Route path="/editincident/:id" element={<EditPostView/>} />
             
          </Route>
        </Routes>
      </BrowserRouter>

        
    </div>
  );
}

export default App;
