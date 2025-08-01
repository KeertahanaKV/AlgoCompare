import React from 'react';
import { Clock, BarChart, RefreshCw } from 'lucide-react';

const PerformanceMetrics = ({ metrics, stepInfo, algorithm }) => {
  const getAlgorithmInfo = () => {
    const algorithmData = {
      bubbleSort: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      selectionSort: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      insertionSort: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      mergeSort: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
      quickSort: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
      heapSort: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
    };
    return algorithmData[algorithm] || { best: 'N/A', average: 'N/A', worst: 'N/A', space: 'N/A' };
  };

  const algorithmInfo = getAlgorithmInfo();

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <BarChart className="w-5 h-5 mr-2" />
        Performance Metrics
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center text-primary mb-2">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Comparisons</span>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.comparisons}</div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center text-accent mb-2">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Swaps</span>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.swaps}</div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center text-success mb-2">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Time (ms)</span>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.time}</div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">Time Complexity</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-300">Best Case:</span>
              <span className="text-success ml-2 font-mono">{algorithmInfo.best}</span>
            </div>
            <div>
              <span className="text-gray-300">Average Case:</span>
              <span className="text-warning ml-2 font-mono">{algorithmInfo.average}</span>
            </div>
            <div>
              <span className="text-gray-300">Worst Case:</span>
              <span className="text-error ml-2 font-mono">{algorithmInfo.worst}</span>
            </div>
            <div>
              <span className="text-gray-300">Space:</span>
              <span className="text-primary ml-2 font-mono">{algorithmInfo.space}</span>
            </div>
          </div>
        </div>

        {stepInfo && stepInfo.variables && (
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Current Variables</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(stepInfo.variables).map(([key, value]) => (
                <div key={key}>
                  <span className="text-gray-300">{key}:</span>
                  <span className="text-white ml-2 font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMetrics;