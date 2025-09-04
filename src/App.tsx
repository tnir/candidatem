import React from 'react';
import Dashboard from './components/Dashboard';
import { generateSampleCandidates } from './utils/candidateData';
import './App.css';

function App() {
  const candidates = generateSampleCandidates();

  return (
    <div className="App">
      <Dashboard candidates={candidates} />
    </div>
  );
}

export default App;
