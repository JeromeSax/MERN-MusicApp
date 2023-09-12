import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import gigImage from './assets/images/gig.jpg';



function App() {
  const styles = {
    backgroundImage: `url(${gigImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '160vh', // Adjust to your design requirements
  };
  return (
    <div style={styles}>
    <Router>
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </div>
  );
}

export default App;
