import React from 'react';
import { Table } from 'lucide-react';

const ComplexityTable = () => {
  const algorithms = [
    {
      name: 'Bubble Sort',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: 'Yes',
      adaptive: 'Yes',
      description: 'Simple comparison-based algorithm. Good for educational purposes.',
      useCase: 'Small datasets, educational purposes'
    },
    {
      name: 'Selection Sort',
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: 'No',
      adaptive: 'No',
      description: 'Finds minimum element and places it at the beginning.',
      useCase: 'Small datasets where memory is limited'
    },
    {
      name: 'Insertion Sort',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: 'Yes',
      adaptive: 'Yes',
      description: 'Builds sorted array one element at a time.',
      useCase: 'Small datasets, nearly sorted data'
    },
    {
      name: 'Merge Sort',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      stable: 'Yes',
      adaptive: 'No',
      description: 'Divide-and-conquer algorithm with guaranteed performance.',
      useCase: 'Large datasets, when stability is required'
    },
    {
      name: 'Quick Sort',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
      stable: 'No',
      adaptive: 'No',
      description: 'Fast average-case performance with pivot selection.',
      useCase: 'Large datasets, general-purpose sorting'
    },
    {
      name: 'Heap Sort',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)',
      stable: 'No',
      adaptive: 'No',
      description: 'Uses binary heap data structure for consistent performance.',
      useCase: 'When consistent O(n log n) performance is needed'
    }
  ];

  const getComplexityColor = (complexity) => {
    if (complexity.includes('O(1)')) return 'text-success';
    if (complexity.includes('O(n)') && !complexity.includes('log') && !complexity.includes('²')) return 'text-success';
    if (complexity.includes('O(n log n)')) return 'text-warning';
    if (complexity.includes('O(n²)')) return 'text-error';
    return 'text-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Table className="w-6 h-6 mr-3" />
          Algorithm Complexity Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-white font-semibold py-3 px-2">Algorithm</th>
                <th className="text-center text-white font-semibold py-3 px-2">Best Case</th>
                <th className="text-center text-white font-semibold py-3 px-2">Average Case</th>
                <th className="text-center text-white font-semibold py-3 px-2">Worst Case</th>
                <th className="text-center text-white font-semibold py-3 px-2">Space</th>
                <th className="text-center text-white font-semibold py-3 px-2">Stable</th>
                <th className="text-center text-white font-semibold py-3 px-2">Adaptive</th>
              </tr>
            </thead>
            <tbody>
              {algorithms.map((algo, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-2 text-white font-medium">{algo.name}</td>
                  <td className={`py-3 px-2 text-center font-mono ${getComplexityColor(algo.best)}`}>
                    {algo.best}
                  </td>
                  <td className={`py-3 px-2 text-center font-mono ${getComplexityColor(algo.average)}`}>
                    {algo.average}
                  </td>
                  <td className={`py-3 px-2 text-center font-mono ${getComplexityColor(algo.worst)}`}>
                    {algo.worst}
                  </td>
                  <td className={`py-3 px-2 text-center font-mono ${getComplexityColor(algo.space)}`}>
                    {algo.space}
                  </td>
                  <td className={`py-3 px-2 text-center ${algo.stable === 'Yes' ? 'text-success' : 'text-error'}`}>
                    {algo.stable}
                  </td>
                  <td className={`py-3 px-2 text-center ${algo.adaptive === 'Yes' ? 'text-success' : 'text-error'}`}>
                    {algo.adaptive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {algorithms.map((algo, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-2">{algo.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{algo.description}</p>
            <div className="bg-gray-700 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Best Use Case:</div>
              <div className="text-white text-sm">{algo.useCase}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Understanding Big O Notation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-success font-semibold mb-2">O(1) - Constant</div>
            <p className="text-gray-300 text-sm">Same time regardless of input size</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-success font-semibold mb-2">O(n) - Linear</div>
            <p className="text-gray-300 text-sm">Time grows proportionally with input</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-warning font-semibold mb-2">O(n log n) - Linearithmic</div>
            <p className="text-gray-300 text-sm">Efficient for most practical purposes</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-error font-semibold mb-2">O(n²) - Quadratic</div>
            <p className="text-gray-300 text-sm">Time grows quadratically with input</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityTable;