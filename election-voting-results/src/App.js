import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectionResultsPage from "./pages/ElectionResultsPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ElectionResultsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
