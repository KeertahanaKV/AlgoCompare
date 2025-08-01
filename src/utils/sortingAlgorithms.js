export const sortingAlgorithms = {
  bubbleSort: {
    name: 'Bubble Sort',
    sort: (arr) => {
      const array = [...arr];
      const steps = [];
      let comparisons = 0;
      let swaps = 0;
      const n = array.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          
          steps.push({
            array: [...array],
            comparing: [j, j + 1],
            variables: { i, j },
            description: `Comparing elements at positions ${j} (${array[j]}) and ${j + 1} (${array[j + 1]}). Are they in the right order?`,
            currentLine: 4
          });

          if (array[j] > array[j + 1]) {
            // Swap elements
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            swaps++;
            
            steps.push({
              array: [...array],
              swapping: [j, j + 1],
              variables: { i, j },
              description: `${array[j]} > ${array[j + 1]}, so we swap them! Moving ${array[j + 1]} to the left.`,
              currentLine: 5
            });
          }
        }
        
        steps.push({
          array: [...array],
          sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
          variables: { i, j: n - i - 1 },
          description: `Pass ${i + 1} complete! The largest element (${array[n - 1 - i]}) has "bubbled" to its correct position.`,
          currentLine: 2
        });
      }

      return { steps, comparisons, swaps };
    },
    code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
  },

  selectionSort: {
    name: 'Selection Sort',
    sort: (arr) => {
      const array = [...arr];
      const steps = [];
      let comparisons = 0;
      let swaps = 0;
      const n = array.length;

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        steps.push({
          array: [...array],
          comparing: [i],
          variables: { i, minIdx },
          description: `Pass ${i + 1}: Looking for the smallest element in the remaining unsorted portion. Currently assuming position ${i} (${array[i]}) has the minimum.`,
          currentLine: 3
        });

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          
          steps.push({
            array: [...array],
            comparing: [minIdx, j],
            variables: { i, j, minIdx },
            description: `Checking position ${j}: Is ${array[j]} smaller than our current minimum ${array[minIdx]}?`,
            currentLine: 5
          });

          if (array[j] < array[minIdx]) {
            minIdx = j;
            
            steps.push({
              array: [...array],
              comparing: [minIdx],
              variables: { i, j, minIdx },
              description: `Yes! Found a new minimum: ${array[minIdx]} at position ${minIdx}. This is now our smallest element.`,
              currentLine: 6
            });
          }
        }

        if (minIdx !== i) {
          [array[i], array[minIdx]] = [array[minIdx], array[i]];
          swaps++;
          
          steps.push({
            array: [...array],
            swapping: [i, minIdx],
            variables: { i, minIdx },
            description: `Swapping the minimum element ${array[minIdx]} with the first unsorted element ${array[i]}. Position ${i} is now sorted!`,
            currentLine: 9
          });
        }
        
        steps.push({
          array: [...array],
          sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
          variables: { i, minIdx },
          description: `Position ${i} is now sorted with value ${array[i]}. Moving to the next position.`,
          currentLine: 2
        });
      }

      return { steps, comparisons, swaps };
    },
    code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`
  },

  insertionSort: {
    name: 'Insertion Sort',
    sort: (arr) => {
      const array = [...arr];
      const steps = [];
      let comparisons = 0;
      let swaps = 0;

      steps.push({
        array: [...array],
        sorted: [0],
        variables: { i: 1 },
        description: 'Starting with the first element - it\'s already "sorted" by itself. Now we\'ll insert each remaining element into the correct position.',
        currentLine: 2
      });

      for (let i = 1; i < array.length; i++) {
        const key = array[i];
        let j = i - 1;
        
        steps.push({
          array: [...array],
          comparing: [i],
          variables: { i, j, key },
          description: `Taking element ${key} from position ${i}. Now we need to find where it belongs in the sorted portion (positions 0 to ${i-1}).`,
          currentLine: 3
        });

        while (j >= 0 && array[j] > key) {
          comparisons++;
          
          steps.push({
            array: [...array],
            comparing: [j, j + 1],
            variables: { i, j, key },
            description: `Is ${array[j]} > ${key}? If yes, we need to shift ${array[j]} to the right to make room.`,
            currentLine: 5
          });

          array[j + 1] = array[j];
          swaps++;
          
          steps.push({
            array: [...array],
            swapping: [j, j + 1],
            variables: { i, j, key },
            description: `Shifting ${array[j + 1]} one position to the right to make space for ${key}.`,
            currentLine: 6
          });

          j--;
        }
        
        if (j >= 0) {
          comparisons++;
        }
        
        array[j + 1] = key;
        
        steps.push({
          array: [...array],
          sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
          variables: { i, j, key },
          description: `Perfect! Inserted ${key} at position ${j + 1}. The first ${i + 1} elements are now sorted.`,
          currentLine: 8
        });
      }

      return { steps, comparisons, swaps };
    },
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
  },

  mergeSort: {
    name: 'Merge Sort',
    sort: (arr) => {
      const steps = [];
      let comparisons = 0;
      let swaps = 0;

      function merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
          comparisons++;
          
          steps.push({
            array: [...arr],
            comparing: [left + i, mid + 1 + j],
            variables: { left, mid, right, i, j, k },
            description: `Merging: comparing ${leftArr[i]} and ${rightArr[j]}`,
            currentLine: 8
          });

          if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
          } else {
            arr[k] = rightArr[j];
            j++;
          }
          
          swaps++;
          steps.push({
            array: [...arr],
            swapping: [k],
            variables: { left, mid, right, i, j, k },
            description: `Placed ${arr[k]} at position ${k}`,
            currentLine: 9
          });
          
          k++;
        }

        while (i < leftArr.length) {
          arr[k] = leftArr[i];
          swaps++;
          steps.push({
            array: [...arr],
            swapping: [k],
            variables: { left, mid, right, i, j, k },
            description: `Copying remaining left element: ${arr[k]}`,
            currentLine: 15
          });
          i++;
          k++;
        }

        while (j < rightArr.length) {
          arr[k] = rightArr[j];
          swaps++;
          steps.push({
            array: [...arr],
            swapping: [k],
            variables: { left, mid, right, i, j, k },
            description: `Copying remaining right element: ${arr[k]}`,
            currentLine: 20
          });
          j++;
          k++;
        }
      }

      function mergeSortHelper(arr, left, right) {
        if (left < right) {
          const mid = Math.floor((left + right) / 2);
          
          steps.push({
            array: [...arr],
            variables: { left, mid, right },
            description: `Divide: Splitting array segment [${left}...${right}] at midpoint ${mid}. We'll sort each half separately.`,
            currentLine: 3
          });

          mergeSortHelper(arr, left, mid);
          mergeSortHelper(arr, mid + 1, right);
          merge(arr, left, mid, right);
          
          steps.push({
            array: [...arr],
            sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
            variables: { left, mid, right },
            description: `Conquer: Successfully merged the sorted halves! Segment [${left}...${right}] is now completely sorted.`,
            currentLine: 6
          });
        }
      }

      const array = [...arr];
      mergeSortHelper(array, 0, array.length - 1);
      
      return { steps, comparisons, swaps };
    },
    code: `function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
  
  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
      }
    }
    
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
  }
}`
  },

  quickSort: {
    name: 'Quick Sort',
    sort: (arr) => {
      const steps = [];
      let comparisons = 0;
      let swaps = 0;

      function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        steps.push({
          array: [...arr],
          variables: { low, high, pivot, i },
          description: `Partitioning: Chose ${pivot} as our pivot (rightmost element). We'll rearrange so smaller elements go left, larger go right.`,
          currentLine: 8
        });

        for (let j = low; j < high; j++) {
          comparisons++;
          
          steps.push({
            array: [...arr],
            comparing: [j, high],
            variables: { low, high, pivot, i, j },
            description: `Is ${arr[j]} smaller than pivot ${pivot}? If yes, it should go to the left side.`,
            currentLine: 11
          });

          if (arr[j] < pivot) {
            i++;
            if (i !== j) {
              [arr[i], arr[j]] = [arr[j], arr[i]];
              swaps++;
              
              steps.push({
                array: [...arr],
                swapping: [i, j],
                variables: { low, high, pivot, i, j },
                description: `${arr[j]} < ${pivot}, so moving it to the left side by swapping with position ${i}.`,
                currentLine: 13
              });
            }
          }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swaps++;
        
        steps.push({
          array: [...arr],
          swapping: [i + 1, high],
          pivot: i + 1,
          variables: { low, high, pivot, i },
          description: `Placing pivot ${pivot} at its final sorted position ${i + 1}. All smaller elements are now to its left, larger to its right.`,
          currentLine: 16
        });

        return i + 1;
      }

      function quickSortHelper(arr, low, high) {
        if (low < high) {
          steps.push({
            array: [...arr],
            variables: { low, high },
            description: `Quick Sort: Now sorting the subarray from position ${low} to ${high}.`,
            currentLine: 2
          });

          const pi = partition(arr, low, high);
          
          steps.push({
            array: [...arr],
            sorted: [pi],
            variables: { low, high, pi },
            description: `Partition complete! Pivot ${arr[pi]} is now in its final sorted position ${pi}.`,
            currentLine: 4
          });

          quickSortHelper(arr, low, pi - 1);
          quickSortHelper(arr, pi + 1, high);
        }
      }

      const array = [...arr];
      quickSortHelper(array, 0, array.length - 1);
      
      return { steps, comparisons, swaps };
    },
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  
  function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }
}`
  },

  heapSort: {
    name: 'Heap Sort',
    sort: (arr) => {
      const steps = [];
      let comparisons = 0;
      let swaps = 0;
      const array = [...arr];
      const n = array.length;

      function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        steps.push({
          array: [...arr],
          variables: { n, i, largest, left, right },
          description: `Heapifying at index ${i}`,
          currentLine: 8
        });

        if (left < n) {
          comparisons++;
          steps.push({
            array: [...arr],
            comparing: [left, largest],
            variables: { n, i, largest, left, right },
            description: `Comparing left child ${arr[left]} with ${arr[largest]}`,
            currentLine: 11
          });
          
          if (arr[left] > arr[largest]) {
            largest = left;
          }
        }

        if (right < n) {
          comparisons++;
          steps.push({
            array: [...arr],
            comparing: [right, largest],
            variables: { n, i, largest, left, right },
            description: `Comparing right child ${arr[right]} with ${arr[largest]}`,
            currentLine: 15
          });
          
          if (arr[right] > arr[largest]) {
            largest = right;
          }
        }

        if (largest !== i) {
          [arr[i], arr[largest]] = [arr[largest], arr[i]];
          swaps++;
          
          steps.push({
            array: [...arr],
            swapping: [i, largest],
            variables: { n, i, largest, left, right },
            description: `Swapping ${arr[largest]} with ${arr[i]}`,
            currentLine: 19
          });

          heapify(arr, n, largest);
        }
      }

      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
      }

      steps.push({
        array: [...array],
        description: 'Max heap built successfully',
        currentLine: 4
      });

      // Extract elements from heap one by one
      for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        swaps++;
        
        steps.push({
          array: [...array],
          swapping: [0, i],
          sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
          variables: { i },
          description: `Moving largest element ${array[i]} to sorted position`,
          currentLine: 6
        });

        heapify(array, i, 0);
      }

      return { steps, comparisons, swaps };
    },
    code: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  }
}`
  }
};