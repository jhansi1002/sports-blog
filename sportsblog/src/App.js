import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';  // Ensure path to UserContext.js is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Cricket from './pages/Cricket';
import Football from './pages/Football';
import Basketball from './pages/Basketball';
import Tennis from './pages/Tennis';  // Import Tennis component
import Baseball from './pages/Baseball';  // Import Baseball component
import Rugby from './pages/Rugby';  // Import Rugby component
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          
          {/* Sports Category Routes */}
          <Route path="/cricket" element={<Cricket />} />
          <Route path="/football" element={<Football />} />
          <Route path="/basketball" element={<Basketball />} />
          <Route path="/tennis" element={<Tennis />} />
          <Route path="/baseball" element={<Baseball />} />
          <Route path="/rugby" element={<Rugby />} />

          
          {/* Add more routes for other sports as needed */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
