import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort, radixSort } from '../algorithms/sortingAlgorithms';
import ArrayControls from './ArrayControls';

const algorithms = {
  bubbleSort: { name: 'Bubble Sort', color: 'bg-blue-500' },
  selectionSort: { name: 'Selection Sort', color: 'bg-green-500' },
  insertionSort: { name: 'Insertion Sort', color: 'bg-purple-500' },
  mergeSort: { name: 'Merge Sort', color: 'bg-red-500' },
  quickSort: { name: 'Quick Sort', color: 'bg-yellow-500' },
  heapSort: { name: 'Heap Sort', color: 'bg-indigo-500' },
  radixSort: { name: 'Radix Sort', color: 'bg-pink-500' }
};

const algorithmFunctions = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  radixSort
};

const ComparisonMode = ({
  array,
  selectedAlgorithm,
  setSelectedAlgorithm,
  comparisonAlgorithm,
  setComparisonAlgorithm,
  animationSpeed,
  isAnimating,
  setIsAnimating,
  sleep,
  stopAnimation,
  comparisonMetrics,
  setComparisonMetrics,
  arraySize,
  setArraySize,
  generateArray,
  onCustomArray
}) => {
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);

  React.useEffect(() => {
    // Sync arrays with main array
    setArray1([...array]);
    setArray2([...array]);
  }, [array]);

  const getBarColor = (state) => {
    switch (state) {
      case 'comparing': return 'bg-blue-500';
      case 'swapping': return 'bg-red-500';
      case 'sorted': return 'bg-green-500';
      case 'pivot': return 'bg-purple-500';
      case 'left': return 'bg-yellow-500';
      case 'right': return 'bg-orange-500';
      default: return 'bg-slate-400';
    }
  };

  const runComparison = async () => {
    if (isAnimating) {
      stopAnimation();
      return;
    }

    setIsAnimating(true);
    setComparisonMetrics({
      algorithm1: { comparisons: 0, swaps: 0, time: 0 },
      algorithm2: { comparisons: 0, swaps: 0, time: 0 }
    });

    const sortingArray1 = [...array];
    const sortingArray2 = [...array];
    
    let metrics1 = { comparisons: 0, swaps: 0 };
    let metrics2 = { comparisons: 0, swaps: 0 };

    const updateArray1 = (newArray) => setArray1([...newArray]);
    const updateArray2 = (newArray) => setArray2([...newArray]);

    const incrementComparisons1 = () => {
      metrics1.comparisons++;
      setComparisonMetrics(prev => ({
        ...prev,
        algorithm1: { ...prev.algorithm1, comparisons: metrics1.comparisons }
      }));
    };

    const incrementSwaps1 = () => {
      metrics1.swaps++;
      setComparisonMetrics(prev => ({
        ...prev,
        algorithm1: { ...prev.algorithm1, swaps: metrics1.swaps }
      }));
    };

    const incrementComparisons2 = () => {
      metrics2.comparisons++;
      setComparisonMetrics(prev => ({
        ...prev,
        algorithm2: { ...prev.algorithm2, comparisons: metrics2.comparisons }
      }));
    };

    const incrementSwaps2 = () => {
      metrics2.swaps++;
      setComparisonMetrics(prev => ({
        ...prev,
        algorithm2: { ...prev.algorithm2, swaps: metrics2.swaps }
      }));
    };

    try {
      const startTime1 = performance.now();
      const startTime2 = performance.now();

      // Run both algorithms simultaneously
      const promise1 = algorithmFunctions[selectedAlgorithm](
        sortingArray1,
        updateArray1,
        sleep,
        animationSpeed,
        incrementComparisons1,
        incrementSwaps1
      ).then(() => {
        const endTime1 = performance.now();
        setComparisonMetrics(prev => ({
          ...prev,
          algorithm1: { ...prev.algorithm1, time: Math.round(endTime1 - startTime1) }
        }));
      });

      const promise2 = algorithmFunctions[comparisonAlgorithm](
        sortingArray2,
        updateArray2,
        sleep,
        animationSpeed,
        incrementComparisons2,
        incrementSwaps2
      ).then(() => {
        const endTime2 = performance.now();
        setComparisonMetrics(prev => ({
          ...prev,
          algorithm2: { ...prev.algorithm2, time: Math.round(endTime2 - startTime2) }
        }));
      });

      await Promise.all([promise1, promise2]);

    } catch (error) {
      console.error('Comparison error:', error);
    } finally {
      setIsAnimating(false);
    }
  };

  const getWinner = () => {
    const { algorithm1, algorithm2 } = comparisonMetrics;
    if (algorithm1.time === 0 || algorithm2.time === 0) return null;

    const score1 = algorithm1.time + (algorithm1.comparisons * 0.1) + (algorithm1.swaps * 0.2);
    const score2 = algorithm2.time + (algorithm2.comparisons * 0.1) + (algorithm2.swaps * 0.2);

    return score1 < score2 ? selectedAlgorithm : comparisonAlgorithm;
  };

  const winner = getWinner();

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ArrayControls
          arraySize={arraySize}
          setArraySize={setArraySize}
          animationSpeed={animationSpeed}
          setAnimationSpeed={() => {}} // Controlled by parent
          generateArray={generateArray}
          onCustomArray={onCustomArray}
          isAnimating={isAnimating}
        />
        
        {/* Algorithm Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Algorithm 1</h3>
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            disabled={isAnimating}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.entries(algorithms).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Algorithm 2</h3>
          <select
            value={comparisonAlgorithm}
            onChange={(e) => setComparisonAlgorithm(e.target.value)}
            disabled={isAnimating}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.entries(algorithms).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        {/* Start Button */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center">
          <button
            onClick={runComparison}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              isAnimating
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isAnimating ? 'Stop Comparison' : 'Start Comparison'}
          </button>
        </div>
      </div>

      {/* Comparison Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Algorithm 1 Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {algorithms[selectedAlgorithm].name}
            </h3>
            {winner === selectedAlgorithm && winner && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Winner! 🏆
              </span>
            )}
          </div>
          
          {/* Visualization */}
          <div className="h-64 flex items-end justify-center gap-1 p-4 bg-slate-50 rounded-lg mb-4">
            {array1.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                className={`flex-1 max-w-8 min-w-1 rounded-t-sm transition-colors duration-200 ${getBarColor(item.state)}`}
                style={{
                  height: `${(item.value / 420) * 100}%`,
                  maxWidth: array1.length > 50 ? '4px' : '20px'
                }}
              />
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-slate-600">Time</div>
              <div className="font-bold text-blue-600">{comparisonMetrics.algorithm1.time}ms</div>
            </div>
            <div className="text-center">
              <div className="text-slate-600">Comparisons</div>
              <div className="font-bold text-green-600">{comparisonMetrics.algorithm1.comparisons}</div>
            </div>
            <div className="text-center">
              <div className="text-slate-600">Swaps</div>
              <div className="font-bold text-red-600">{comparisonMetrics.algorithm1.swaps}</div>
            </div>
          </div>
        </div>

        {/* Algorithm 2 Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {algorithms[comparisonAlgorithm].name}
            </h3>
            {winner === comparisonAlgorithm && winner && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Winner! 🏆
              </span>
            )}
          </div>
          
          {/* Visualization */}
          <div className="h-64 flex items-end justify-center gap-1 p-4 bg-slate-50 rounded-lg mb-4">
            {array2.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                className={`flex-1 max-w-8 min-w-1 rounded-t-sm transition-colors duration-200 ${getBarColor(item.state)}`}
                style={{
                  height: `${(item.value / 420) * 100}%`,
                  maxWidth: array2.length > 50 ? '4px' : '20px'
                }}
              />
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-slate-600">Time</div>
              <div className="font-bold text-blue-600">{comparisonMetrics.algorithm2.time}ms</div>
            </div>
            <div className="text-center">
              <div className="text-slate-600">Comparisons</div>
              <div className="font-bold text-green-600">{comparisonMetrics.algorithm2.comparisons}</div>
            </div>
            <div className="text-center">
              <div className="text-slate-600">Swaps</div>
              <div className="font-bold text-red-600">{comparisonMetrics.algorithm2.swaps}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {winner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Comparison Summary
          </h3>
          <div className="text-slate-700">
            <p className="mb-2">
              <strong>{algorithms[winner].name}</strong> performed better for this input array.
            </p>
            <p className="text-sm">
              The winner was determined based on execution time, number of comparisons, and swaps performed.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ComparisonMode;