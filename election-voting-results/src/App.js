import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectionResultsPage from "./pages/ElectionResultsPage";
import SectorsPage from "./pages/SectorsPage";import { useParams } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ElectionResultsPage />} />
          <Route path="/cities/:id" element={<SectorsPage />} />
          <Route path="/province/:id" element={<SectorsPage />} />
          <Route path="/region/:id" element={<SectorsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
