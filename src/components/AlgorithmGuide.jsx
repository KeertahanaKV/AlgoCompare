import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';

const AlgorithmGuide = () => {
  const [expandedSection, setExpandedSection] = useState('choosing');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const recommendations = [
    {
      scenario: 'Small Arrays (< 50 elements)',
      algorithm: 'Insertion Sort',
      reason: 'Simple implementation, low overhead, performs well on small datasets',
      color: 'success'
    },
    {
      scenario: 'Large Random Arrays',
      algorithm: 'Quick Sort or Merge Sort',
      reason: 'O(n log n) average performance, efficient for random data',
      color: 'primary'
    },
    {
      scenario: 'Nearly Sorted Data',
      algorithm: 'Insertion Sort',
      reason: 'Adaptive algorithm that performs well on partially sorted data',
      color: 'success'
    },
    {
      scenario: 'Guaranteed Performance',
      algorithm: 'Merge Sort or Heap Sort',
      reason: 'Consistent O(n log n) performance regardless of input',
      color: 'secondary'
    },
    {
      scenario: 'Memory Constrained',
      algorithm: 'Heap Sort',
      reason: 'In-place sorting with O(1) extra space complexity',
      color: 'warning'
    },
    {
      scenario: 'Stability Required',
      algorithm: 'Merge Sort',
      reason: 'Maintains relative order of equal elements',
      color: 'secondary'
    }
  ];

  const algorithmDetails = {
    bubbleSort: {
      title: 'Bubble Sort',
      description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      pros: ['Simple to understand and implement', 'No additional memory space needed', 'Adaptive (performs better on partially sorted data)'],
      cons: ['Poor time complexity O(n²) for average and worst case', 'More swaps compared to other O(n²) algorithms', 'Not suitable for large datasets'],
      whenToUse: 'Educational purposes, very small datasets, or when simplicity is more important than efficiency.'
    },
    selectionSort: {
      title: 'Selection Sort',
      description: 'Finds the minimum element from the unsorted part and puts it at the beginning.',
      pros: ['Simple implementation', 'Minimizes the number of swaps', 'Performs well on small lists'],
      cons: ['Inefficient on large lists', 'Not adaptive', 'Not stable'],
      whenToUse: 'When memory write is a costly operation, or for small datasets where simplicity matters.'
    },
    insertionSort: {
      title: 'Insertion Sort',
      description: 'Builds the final sorted array one item at a time by inserting each element into its proper position.',
      pros: ['Adaptive - efficient for nearly sorted data', 'Stable sorting algorithm', 'In-place sorting', 'Online - can sort a list as it receives it'],
      cons: ['Inefficient for large datasets', 'More writes compared to selection sort'],
      whenToUse: 'Small datasets, nearly sorted data, or when you need a stable, adaptive sorting algorithm.'
    },
    mergeSort: {
      title: 'Merge Sort',
      description: 'Divides the array into halves, sorts them separately, then merges the sorted halves.',
      pros: ['Guaranteed O(n log n) performance', 'Stable sorting algorithm', 'Predictable performance', 'Works well with linked lists'],
      cons: ['Requires O(n) extra space', 'Not adaptive', 'Slightly more overhead than quicksort for small arrays'],
      whenToUse: 'Large datasets, when stability is required, or when guaranteed performance is needed.'
    },
    quickSort: {
      title: 'Quick Sort',
      description: 'Picks a pivot element and partitions the array around the pivot, then recursively sorts the sub-arrays.',
      pros: ['Average case O(n log n) performance', 'In-place sorting', 'Cache-efficient', 'Generally faster than other O(n log n) algorithms'],
      cons: ['Worst case O(n²) performance', 'Not stable', 'Performance depends on pivot selection'],
      whenToUse: 'General-purpose sorting, large datasets, when average-case performance is acceptable.'
    },
    heapSort: {
      title: 'Heap Sort',
      description: 'Uses a binary heap data structure to sort elements, guaranteeing O(n log n) performance.',
      pros: ['Guaranteed O(n log n) performance', 'In-place sorting', 'Not affected by input distribution'],
      cons: ['Not stable', 'Not adaptive', 'Poor cache performance compared to quicksort'],
      whenToUse: 'When guaranteed O(n log n) performance is required with minimal memory usage.'
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3" />
          Algorithm Selection Guide
        </h2>
        
        <div className="space-y-4">
          {/* Choosing Algorithm Section */}
          <div className="border border-gray-700 rounded-lg">
            <button
              onClick={() => toggleSection('choosing')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white">Which Algorithm Should I Use?</h3>
              {expandedSection === 'choosing' ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </button>
            
            {expandedSection === 'choosing' && (
              <div className="p-4 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full bg-${rec.color} mr-2`}></div>
                        <h4 className="font-semibold text-white">{rec.scenario}</h4>
                      </div>
                      <div className="text-primary font-medium mb-1">→ {rec.algorithm}</div>
                      <p className="text-gray-300 text-sm">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Algorithm Details Section */}
          <div className="border border-gray-700 rounded-lg">
            <button
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white">Detailed Algorithm Analysis</h3>
              {expandedSection === 'details' ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </button>
            
            {expandedSection === 'details' && (
              <div className="p-4 border-t border-gray-700">
                <div className="space-y-6">
                  {Object.entries(algorithmDetails).map(([key, algo]) => (
                    <div key={key} className="bg-gray-700 rounded-lg p-5">
                      <h4 className="text-xl font-bold text-white mb-3">{algo.title}</h4>
                      <p className="text-gray-300 mb-4">{algo.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-semibold text-success mb-2">✅ Pros:</h5>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {algo.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-error mb-2">❌ Cons:</h5>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {algo.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gray-600 rounded p-3">
                        <h5 className="font-semibold text-warning mb-1">When to Use:</h5>
                        <p className="text-gray-200 text-sm">{algo.whenToUse}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Decision Tree Section */}
          <div className="border border-gray-700 rounded-lg">
            <button
              onClick={() => toggleSection('decision')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white">Decision Tree</h3>
              {expandedSection === 'decision' ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </button>
            
            {expandedSection === 'decision' && (
              <div className="p-4 border-t border-gray-700">
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-semibold">
                      What's your dataset size?
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-success text-white px-3 py-2 rounded-lg mb-3 font-medium">
                        Small (&lt; 50)
                      </div>
                      <div className="text-gray-300 text-sm mb-2">Use Insertion Sort</div>
                      <div className="text-xs text-gray-400">Simple and efficient for small data</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-warning text-white px-3 py-2 rounded-lg mb-3 font-medium">
                        Medium (50-1000)
                      </div>
                      <div className="text-gray-300 text-sm mb-2">
                        Nearly sorted? → Insertion Sort<br/>
                        Random data? → Quick Sort
                      </div>
                      <div className="text-xs text-gray-400">Consider data characteristics</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-error text-white px-3 py-2 rounded-lg mb-3 font-medium">
                        Large (&gt; 1000)
                      </div>
                      <div className="text-gray-300 text-sm mb-2">
                        Need stability? → Merge Sort<br/>
                        General purpose? → Quick Sort<br/>
                        Guaranteed performance? → Heap Sort
                      </div>
                      <div className="text-xs text-gray-400">Choose based on requirements</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmGuide;