import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputPage from './InputPage';
import ResultsPage from './ResultsPage';

function App() {

  useEffect(() => {
    document.title = 'Brew Calc';
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
