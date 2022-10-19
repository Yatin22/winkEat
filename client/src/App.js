import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import VendorLogin from './Pages/VendorLogin';
import Contact from './Pages/Contact';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendorlogin" element={<VendorLogin />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
