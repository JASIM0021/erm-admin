// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import UploadBook from './UploadBook';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/upload-book" element={<UploadBook />} />
      </Routes>
    </Router>
  );
};

export default App;
