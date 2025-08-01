import React from 'react';
import { motion } from 'framer-motion';

const VisualizationCanvas = ({ array, stepInfo, algorithm }) => {
  const maxValue = Math.max(...array);
  const getBarHeight = (value) => (value / maxValue) * 300;

  const getBarColor = (index, value) => {
    if (!stepInfo) return 'bg-gray-400';
    
    const { comparing, swapping, sorted, pivot, variables } = stepInfo;
    
    // Check if element is sorted
    if (sorted && sorted.includes(index)) {
      return 'bg-success';
    }
    
    // Check if element is being swapped
    if (swapping && swapping.includes(index)) {
      return 'bg-accent';
    }
    
    // Check if element is being compared
    if (comparing && comparing.includes(index)) {
      return 'bg-primary';
    }
    
    // Special highlighting for different algorithms
    if (variables) {
      if (algorithm === 'quickSort' && variables.pivot === index) {
        return 'bg-purple-500';
      }
      if (algorithm === 'mergeSort' && variables.mid === index) {
        return 'bg-yellow-500';
      }
    }
    
    return 'bg-gray-400';
  };

  const getBarLabel = (index) => {
    if (!stepInfo || !stepInfo.variables) return null;
    
    const { variables } = stepInfo;
    const labels = [];
    
    if (variables.i === index) labels.push('i');
    if (variables.j === index) labels.push('j');
    if (variables.left === index) labels.push('L');
    if (variables.right === index) labels.push('R');
    if (variables.mid === index) labels.push('M');
    if (variables.pivot === index) labels.push('P');
    if (variables.low === index) labels.push('Lo');
    if (variables.high === index) labels.push('Hi');
    
    return labels.length > 0 ? labels.join(',') : null;
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 min-h-[400px] flex items-end justify-center space-x-1">
      {array.map((value, index) => {
        const height = getBarHeight(value);
        const color = getBarColor(index, value);
        const label = getBarLabel(index);
        
        return (
          <div key={index} className="flex flex-col items-center">
            {label && (
              <div className="text-xs text-white mb-1 font-semibold">
                {label}
              </div>
            )}
            <motion.div
              className={`${color} rounded-t-sm flex items-end justify-center text-white text-xs font-medium min-w-[20px] max-w-[40px] transition-colors duration-300`}
              style={{ 
                height: `${height}px`,
                width: Math.max(20, Math.min(40, 800 / array.length))
              }}
              initial={{ height: 0 }}
              animate={{ height: `${height}px` }}
              transition={{ duration: 0.3 }}
            >
              <span className="pb-1 transform -rotate-90 origin-center text-[10px]">
                {value}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default VisualizationCanvas;