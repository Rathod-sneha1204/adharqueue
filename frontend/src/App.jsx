// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import SlotBooking from './Components/SlotBooking';
import UserProfile from './Components/UserProfile';
import AdminDashboard from './Components/AdminDashboard';
import Home from './Components/Home';
import Contact from './Components/Contact';
import ServicePage from './Components/ServicePage';

const App = () => { 
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/book-slot" element={<SlotBooking />} />
                <Route path="/Profile" element={<UserProfile />} />
                <Route path="/Admin" element={< AdminDashboard/>}/>
                <Route path="/Home" element={< Home/>}/>
                <Route path="/contact" element={< Contact/>} />
                <Route path='/ServicePage' element={<ServicePage />} />
            </Routes>
        </Router>
    );
};

export default App;
