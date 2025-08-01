import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import AlgorithmSelector from './AlgorithmSelector';
import ArrayControls from './ArrayControls';
import VisualizationCanvas from './VisualizationCanvas';
import { sortingAlgorithms } from '../utils/sortingAlgorithms';
import { generateArray } from '../utils/arrayUtils';

const ComparisonView = () => {
  const [array, setArray] = useState(generateArray(20, 'random'));
  const [originalArray, setOriginalArray] = useState([]);
  const [algorithm1, setAlgorithm1] = useState('bubbleSort');
  const [algorithm2, setAlgorithm2] = useState('quickSort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  
  // State for both algorithms
  const [state1, setState1] = useState({
    array: [],
    steps: [],
    currentStep: -1,
    metrics: { comparisons: 0, swaps: 0, time: 0 },
    finished: false
  });
  
  const [state2, setState2] = useState({
    array: [],
    steps: [],
    currentStep: -1,
    metrics: { comparisons: 0, swaps: 0, time: 0 },
    finished: false
  });

  const animationRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    setOriginalArray([...array]);
    reset();
  }, [array, algorithm1, algorithm2]);

  const reset = () => {
    setIsPlaying(false);
    setState1({
      array: [...array],
      steps: [],
      currentStep: -1,
      metrics: { comparisons: 0, swaps: 0, time: 0 },
      finished: false
    });
    setState2({
      array: [...array],
      steps: [],
      currentStep: -1,
      metrics: { comparisons: 0, swaps: 0, time: 0 },
      finished: false
    });
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const startComparison = () => {
    // Generate steps for both algorithms
    const result1 = sortingAlgorithms[algorithm1].sort([...originalArray]);
    const result2 = sortingAlgorithms[algorithm2].sort([...originalArray]);
    
    setState1(prev => ({
      ...prev,
      steps: result1.steps,
      metrics: { ...result1, time: 0 }
    }));
    
    setState2(prev => ({
      ...prev,
      steps: result2.steps,
      metrics: { ...result2, time: 0 }
    }));
    
    setIsPlaying(true);
    startTimeRef.current = Date.now();
    runComparison();
  };

  const runComparison = () => {
    setState1(prev => {
      if (prev.currentStep < prev.steps.length - 1 && !prev.finished) {
        const nextStep = prev.currentStep + 1;
        return {
          ...prev,
          currentStep: nextStep,
          array: [...prev.steps[nextStep].array],
          finished: nextStep >= prev.steps.length - 1
        };
      }
      return prev;
    });

    setState2(prev => {
      if (prev.currentStep < prev.steps.length - 1 && !prev.finished) {
        const nextStep = prev.currentStep + 1;
        return {
          ...prev,
          currentStep: nextStep,
          array: [...prev.steps[nextStep].array],
          finished: nextStep >= prev.steps.length - 1
        };
      }
      return prev;
    });

    // Continue animation if either algorithm is still running
    if (!state1.finished || !state2.finished) {
      const delay = 101 - speed;
      animationRef.current = setTimeout(runComparison, delay);
    } else {
      setIsPlaying(false);
      const endTime = Date.now();
      const totalTime = endTime - startTimeRef.current;
      
      setState1(prev => ({ ...prev, metrics: { ...prev.metrics, time: totalTime } }));
      setState2(prev => ({ ...prev, metrics: { ...prev.metrics, time: totalTime } }));
    }
  };

  const pauseComparison = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const getWinnerAnalysis = () => {
    if (!state1.finished || !state2.finished) return null;
    
    const winner = state1.metrics.comparisons + state1.metrics.swaps < 
                   state2.metrics.comparisons + state2.metrics.swaps ? algorithm1 : algorithm2;
    
    return {
      winner,
      reason: `${sortingAlgorithms[winner].name} performed fewer operations`
    };
  };

  const analysis = getWinnerAnalysis();

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Side-by-Side Algorithm Comparison</h2>
        
        <ArrayControls
          array={array}
          onArrayChange={setArray}
          speed={speed}
          onSpeedChange={setSpeed}
          disabled={isPlaying}
        />

        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            onClick={isPlaying ? pauseComparison : startComparison}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Start Comparison'}</span>
          </button>
          
          <button
            onClick={reset}
            disabled={isPlaying}
            className="flex items-center space-x-2 px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/80 disabled:opacity-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Algorithm 1 */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="mb-4">
            <AlgorithmSelector
              selectedAlgorithm={algorithm1}
              onAlgorithmChange={setAlgorithm1}
            />
          </div>
          
          <VisualizationCanvas
            array={state1.array}
            stepInfo={state1.steps[state1.currentStep]}
            algorithm={algorithm1}
          />
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div className="bg-gray-700 rounded p-2 text-center">
              <div className="text-primary">Comparisons</div>
              <div className="text-white font-bold">{state1.metrics.comparisons}</div>
            </div>
            <div className="bg-gray-700 rounded p-2 text-center">
              <div className="text-accent">Swaps</div>
              <div className="text-white font-bold">{state1.metrics.swaps}</div>
            </div>
            <div className="bg-gray-700 rounded p-2 text-center">
              <div className="text-success">Status</div>
              <div className="text-white font-bold">{state1.finished ? 'Done' : 'Running'}</div>
            </div>
          </div>
        </div>

        {/* Algorithm 2 */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="mb-4">
            <AlgorithmSelector
              selectedAlgorithm={algorithm2}
              onAlgorithmChange={setAlgorithm2}
            />
          </div>
          
          <VisualizationCanvas
            array={state2.array}
            stepInfo={state2.steps[state2.currentStep]}
            algorithm={algorithm2}
          />
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div className="bg-gray-700 rounded p-2 text-center">
              <div className="text-primary">Comparisons</div>
              <div className="text-white font-bold">{state2.metrics.comparisons}</div>
            </div>
            <div className="bg-gray-700 rounded p-2 text-center">
              <div className="text-accent">Swaps</div>
              <div className="text-white font-bold">{state2.metrics.swaps}</div>
            </div>
            <div className="bg-gray-700 rounded p-2 text-center">
              <div className="text-success">Status</div>
              <div className="text-white font-bold">{state2.finished ? 'Done' : 'Running'}</div>
            </div>
          </div>
        </div>
      </div>

      {analysis && (
        <div className="bg-gradient-to-r from-success to-primary rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-2">Comparison Results</h3>
          <p className="text-white">
            🏆 <strong>{sortingAlgorithms[analysis.winner].name}</strong> wins! {analysis.reason}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3">
              <div className="font-semibold text-white">{sortingAlgorithms[algorithm1].name}</div>
              <div className="text-gray-200">Total Operations: {state1.metrics.comparisons + state1.metrics.swaps}</div>
            </div>
            <div className="bg-white/10 rounded p-3">
              <div className="font-semibold text-white">{sortingAlgorithms[algorithm2].name}</div>
              <div className="text-gray-200">Total Operations: {state2.metrics.comparisons + state2.metrics.swaps}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonView;