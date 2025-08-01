import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort, radixSort } from '../algorithms/sortingAlgorithms';

const VisualizationPanel = ({
  array,
  selectedAlgorithm,
  animationSpeed,
  isAnimating,
  setIsAnimating,
  updateArray,
  sleep,
  stopAnimation,
  setMetrics,
  setCurrentLine
}) => {
  const [variables, setVariables] = useState({});

  const algorithms = {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort,
    radixSort
  };

  const handleSort = async () => {
    if (isAnimating) {
      stopAnimation();
      return;
    }

    setIsAnimating(true);
    setMetrics({ comparisons: 0, swaps: 0, time: 0 });
    setVariables({});

    const startTime = performance.now();
    const sortingArray = [...array];
    let comparisons = 0;
    let swaps = 0;

    const updateVisualization = (newArray, newVariables = {}, lineNumber = -1) => {
      updateArray(newArray);
      setVariables(newVariables);
      setCurrentLine(lineNumber);
    };

    const incrementComparisons = () => {
      comparisons++;
      setMetrics(prev => ({ ...prev, comparisons }));
    };

    const incrementSwaps = () => {
      swaps++;
      setMetrics(prev => ({ ...prev, swaps }));
    };

    try {
      const sortFunction = algorithms[selectedAlgorithm];
      if (sortFunction) {
        await sortFunction(
          sortingArray,
          updateVisualization,
          sleep,
          animationSpeed,
          incrementComparisons,
          incrementSwaps
        );
      }
      
      // Mark all elements as sorted
      const finalArray = sortingArray.map(item => ({ ...item, state: 'sorted' }));
      updateArray(finalArray);
      
      const endTime = performance.now();
      setMetrics(prev => ({ ...prev, time: Math.round(endTime - startTime) }));
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      setIsAnimating(false);
      setCurrentLine(-1);
    }
  };

  const getBarColor = (state) => {
    switch (state) {
      case 'comparing':
        return 'bg-blue-500';
      case 'swapping':
        return 'bg-red-500';
      case 'sorted':
        return 'bg-green-500';
      case 'pivot':
        return 'bg-purple-500';
      case 'left':
        return 'bg-yellow-500';
      case 'right':
        return 'bg-orange-500';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Visualization</h2>
        <button
          onClick={handleSort}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isAnimating
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAnimating ? 'Stop' : 'Start Sorting'}
        </button>
      </div>

      {/* Variables Display */}
      {Object.keys(variables).length > 0 && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <h3 className="text-sm font-medium text-slate-700 mb-2">Variables:</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            {Object.entries(variables).map(([key, value]) => (
              <span key={key} className="px-2 py-1 bg-white rounded border">
                <span className="font-medium text-slate-600">{key}:</span>
                <span className="ml-1 text-slate-900">{value}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Array Visualization */}
      <div className="relative">
        <div 
          className="flex items-end justify-center gap-1 h-96 p-4"
          style={{ minHeight: '400px' }}
        >
          <AnimatePresence>
            {array.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  height: `${(item.value / 420) * 100}%`
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`relative flex-1 max-w-8 min-w-2 rounded-t-sm transition-colors duration-200 ${getBarColor(item.state)}`}
                style={{
                  height: `${(item.value / 420) * 100}%`,
                  maxWidth: array.length > 50 ? '6px' : '32px'
                }}
              >
                {array.length <= 20 && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-600">
                    {item.value}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-400 rounded"></div>
            <span>Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Sorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Pivot</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPanel;