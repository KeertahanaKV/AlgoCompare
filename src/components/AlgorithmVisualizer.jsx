import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Settings } from 'lucide-react';
import ArrayControls from './ArrayControls';
import AlgorithmSelector from './AlgorithmSelector';
import PerformanceMetrics from './PerformanceMetrics';
import CodeDisplay from './CodeDisplay';
import { sortingAlgorithms } from '../utils/sortingAlgorithms';
import { generateArray } from '../utils/arrayUtils';

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState(generateArray(12, 'random'));
  const [originalArray, setOriginalArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [currentStep, setCurrentStep] = useState(-1);
  const [steps, setSteps] = useState([]);
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0, time: 0 });
  const [showCode, setShowCode] = useState(false);
  
  const animationRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    setOriginalArray([...array]);
    resetVisualization();
  }, [array, selectedAlgorithm]);

  const resetVisualization = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    setSteps([]);
    setMetrics({ comparisons: 0, swaps: 0, time: 0 });
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const startVisualization = () => {
    if (steps.length === 0) {
      const algorithm = sortingAlgorithms[selectedAlgorithm];
      const result = algorithm.sort([...originalArray]);
      setSteps(result.steps);
      setMetrics({ 
        comparisons: result.comparisons, 
        swaps: result.swaps, 
        time: 0 
      });
    }
    
    setIsPlaying(true);
    startTimeRef.current = Date.now();
    
    if (currentStep < steps.length - 1) {
      runAnimation();
    }
  };

  const pauseVisualization = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const runAnimation = () => {
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      const endTime = Date.now();
      setMetrics(prev => ({ ...prev, time: endTime - startTimeRef.current }));
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    const delay = Math.max(200, 2000 - (speed * 18));
    animationRef.current = setTimeout(() => {
      if (isPlaying) {
        runAnimation();
      }
    }, delay);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    resetVisualization();
  };

  const getCurrentStepInfo = () => {
    if (currentStep >= 0 && currentStep < steps.length) {
      return steps[currentStep];
    }
    return null;
  };

  const getCurrentArray = () => {
    if (currentStep >= 0 && currentStep < steps.length) {
      return steps[currentStep].array;
    }
    return originalArray;
  };

  const getBarColor = (index) => {
    const stepInfo = getCurrentStepInfo();
    if (!stepInfo) return 'bg-gray-400';

    // Sorted elements
    if (stepInfo.sorted && stepInfo.sorted.includes(index)) {
      return 'bg-success';
    }

    // Swapping elements
    if (stepInfo.swapping && stepInfo.swapping.includes(index)) {
      return 'bg-accent animate-pulse';
    }

    // Comparing elements
    if (stepInfo.comparing && stepInfo.comparing.includes(index)) {
      return 'bg-primary animate-bounce-gentle';
    }

    // Pivot element (Quick Sort)
    if (stepInfo.pivot !== undefined && index === stepInfo.pivot) {
      return 'bg-purple-500';
    }

    return 'bg-gray-400';
  };

  const getVariableLabels = (index) => {
    const stepInfo = getCurrentStepInfo();
    if (!stepInfo || !stepInfo.variables) return [];

    const labels = [];
    const vars = stepInfo.variables;

    if (vars.i === index) labels.push({ label: 'i', color: 'bg-blue-500' });
    if (vars.j === index) labels.push({ label: 'j', color: 'bg-green-500' });
    if (vars.minIdx === index) labels.push({ label: 'min', color: 'bg-yellow-500' });
    if (vars.left === index) labels.push({ label: 'L', color: 'bg-cyan-500' });
    if (vars.right === index) labels.push({ label: 'R', color: 'bg-pink-500' });
    if (vars.mid === index) labels.push({ label: 'M', color: 'bg-indigo-500' });
    if (vars.low === index) labels.push({ label: 'Lo', color: 'bg-orange-500' });
    if (vars.high === index) labels.push({ label: 'Hi', color: 'bg-red-500' });
    if (vars.pivot === index) labels.push({ label: 'P', color: 'bg-purple-500' });

    return labels;
  };

  const getStepExplanation = () => {
    const stepInfo = getCurrentStepInfo();
    if (!stepInfo) return "Click Play to start the sorting animation!";

    return stepInfo.description || "Processing...";
  };

  const getAlgorithmDescription = () => {
    const descriptions = {
      bubbleSort: "Bubble Sort compares adjacent elements and swaps them if they're in the wrong order. It 'bubbles' the largest element to the end in each pass.",
      selectionSort: "Selection Sort finds the minimum element from the unsorted portion and places it at the beginning of the sorted portion.",
      insertionSort: "Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position.",
      mergeSort: "Merge Sort divides the array into halves, sorts them recursively, then merges the sorted halves back together.",
      quickSort: "Quick Sort picks a pivot element and partitions the array so elements smaller than pivot go left, larger go right.",
      heapSort: "Heap Sort builds a max heap from the array, then repeatedly extracts the maximum element to build the sorted array."
    };
    return descriptions[selectedAlgorithm] || "";
  };

  return (
    <div className="space-y-6">
      {/* Main Control Panel */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <AlgorithmSelector 
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={setSelectedAlgorithm}
          />
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>{showCode ? 'Hide Code' : 'Show Code'}</span>
            </button>
          </div>
        </div>

        <ArrayControls
          array={array}
          onArrayChange={setArray}
          speed={speed}
          onSpeedChange={setSpeed}
          disabled={isPlaying}
        />

        {/* Algorithm Description */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">How {sortingAlgorithms[selectedAlgorithm].name} Works:</h3>
          <p className="text-gray-300">{getAlgorithmDescription()}</p>
        </div>
      </div>

      {/* Visualization Panel */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">Step-by-Step Visualization</h2>
        
        {/* Array Visualization */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <div className="flex items-end justify-center space-x-2 h-80">
            {getCurrentArray().map((value, index) => {
              const height = (value / Math.max(...getCurrentArray())) * 250;
              const labels = getVariableLabels(index);
              
              return (
                <div key={index} className="flex flex-col items-center">
                  {/* Variable Labels */}
                  <div className="h-8 flex flex-col items-center justify-end mb-2">
                    {labels.map((labelInfo, labelIndex) => (
                      <div
                        key={labelIndex}
                        className={`${labelInfo.color} text-white text-xs px-2 py-1 rounded-full font-bold mb-1 shadow-lg`}
                      >
                        {labelInfo.label}
                      </div>
                    ))}
                  </div>
                  
                  {/* Bar */}
                  <div
                    className={`${getBarColor(index)} rounded-t-lg flex items-end justify-center text-white font-bold text-sm transition-all duration-500 min-w-[40px] max-w-[60px] shadow-lg`}
                    style={{ 
                      height: `${height}px`,
                      width: Math.min(60, Math.max(40, 600 / getCurrentArray().length))
                    }}
                  >
                    <span className="pb-2">{value}</span>
                  </div>
                  
                  {/* Index */}
                  <div className="text-gray-400 text-xs mt-2 font-medium">
                    {index}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Explanation */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-2">
            Step {currentStep + 1} of {steps.length}:
          </h3>
          <p className="text-gray-300 text-lg">{getStepExplanation()}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={stepBackward}
            disabled={currentStep <= -1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SkipBack className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={isPlaying ? pauseVisualization : startVisualization}
            disabled={currentStep >= steps.length - 1 && steps.length > 0}
            className="flex items-center space-x-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          
          <button
            onClick={stepForward}
            disabled={currentStep >= steps.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <SkipForward className="w-4 h-4" />
          </button>
          
          <button
            onClick={reset}
            disabled={isPlaying}
            className="flex items-center space-x-2 px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-gray-300">Unsorted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded"></div>
            <span className="text-gray-300">Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent rounded"></div>
            <span className="text-gray-300">Swapping</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded"></div>
            <span className="text-gray-300">Sorted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-gray-300">Pivot</span>
          </div>
        </div>
      </div>

      {/* Performance and Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceMetrics 
          metrics={metrics}
          stepInfo={getCurrentStepInfo()}
          algorithm={selectedAlgorithm}
        />
        
        {showCode && (
          <CodeDisplay
            algorithm={selectedAlgorithm}
            stepInfo={getCurrentStepInfo()}
          />
        )}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;