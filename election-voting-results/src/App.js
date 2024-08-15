import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectionResultsPage from "./pages/ElectionResultsPage";
import SectorsPage from "./pages/SectorsPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ElectionResultsPage />} />
          <Route path="/:id" element={<SectorsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
