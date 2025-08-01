import React, { useState } from 'react';
import Header from './components/Header';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import ComparisonView from './components/ComparisonView';
import ComplexityTable from './components/ComplexityTable';
import AlgorithmGuide from './components/AlgorithmGuide';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('visualizer');

  const renderActiveView = () => {
    switch (activeView) {
      case 'visualizer':
        return <AlgorithmVisualizer />;
      case 'comparison':
        return <ComparisonView />;
      case 'complexity':
        return <ComplexityTable />;
      case 'guide':
        return <AlgorithmGuide />;
      default:
        return <AlgorithmVisualizer />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto px-4 py-8">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;