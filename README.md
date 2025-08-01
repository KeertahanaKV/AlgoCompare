# AlgoCompare - Interactive Sorting Algorithm Visualizer



**AlgoCompare** is an interactive web application that helps users understand and compare various sorting algorithms through real-time animations, visual step-by-step execution, and performance metrics. Perfect for students, educators, and developers who want to learn sorting algorithms visually.

## 🌟 Features

### 🎞️ Interactive Algorithm Visualizer
- **Step-by-step animations** with color-coded bars
- **Variable tracking** - see i, j, pivot, min, and other algorithm variables in real-time
- **Beginner-friendly explanations** for each step
- **Manual controls** - Play, Pause, Next Step, Previous Step
- **Speed control** - Slow, Normal, Fast animation speeds

### 🔄 Side-by-Side Comparison
- **Dual-panel view** to compare two algorithms simultaneously
- **Real-time performance metrics** - comparisons, swaps, execution time
- **Winner analysis** with efficiency recommendations
- **Same input data** for fair comparison

### 🛠️ Array Controls
- **Multiple input options**:
  - Random arrays
  - Sorted arrays
  - Reversed arrays
  - Custom user input
- **Quick start examples** for immediate learning
- **Array size control** (5-20 elements for optimal visualization)
- **Shuffle functionality**

### 📊 Educational Resources
- **Algorithm complexity table** with Big O notation
- **Decision guide** - "Which algorithm should I use?"
- **Detailed algorithm explanations**
- **Code display** with line-by-line highlighting

## 🎯 Supported Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/algocompare.git
   cd algocompare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production
```bash
npm run build
npm run preview
```

## 🎮 How to Use

### 1. Algorithm Visualizer
1. **Select an algorithm** from the dropdown menu
2. **Choose your array** - use quick start examples or create custom arrays
3. **Adjust speed** using the speed control slider
4. **Click Play** to start the step-by-step animation
5. **Watch the variables** - i, j, pivot, etc. are highlighted above the bars
6. **Read explanations** - each step includes beginner-friendly descriptions

### 2. Side-by-Side Comparison
1. **Navigate to "Side-by-Side Compare"** tab
2. **Select two algorithms** to compare
3. **Set up your array** using the same controls
4. **Start comparison** to see both algorithms run simultaneously
5. **View results** - see which algorithm performed better and why

### 3. Learning Resources
- **Complexity Table** - Compare all algorithms at a glance
- **Algorithm Guide** - Get recommendations for different scenarios
- **Code Display** - See the actual implementation with highlighting

## 🎨 Visual Elements

### Color Coding
- 🔵 **Blue** - Elements being compared
- 🟠 **Orange** - Elements being swapped
- 🟢 **Green** - Sorted elements
- 🟣 **Purple** - Pivot element (Quick Sort)
- 🟡 **Yellow** - Special markers (left/right pointers)

### Variable Labels
Each algorithm shows relevant variables:
- **Bubble Sort**: `i`, `j`
- **Selection Sort**: `i`, `j`, `min`
- **Insertion Sort**: `i`, `j`, `key`
- **Merge Sort**: `left`, `mid`, `right`
- **Quick Sort**: `pivot`, `low`, `high`
- **Heap Sort**: `i`, `left`, `right`, `largest`

## 🏗️ Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
algocompare/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── AlgorithmVisualizer.jsx
│   │   ├── ComparisonView.jsx
│   │   ├── ComplexityTable.jsx
│   │   ├── AlgorithmGuide.jsx
│   │   ├── ArrayControls.jsx
│   │   ├── CodeDisplay.jsx
│   │   └── PerformanceMetrics.jsx
│   ├── utils/
│   │   ├── sortingAlgorithms.js
│   │   └── arrayUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

## 🎓 Educational Use Cases

### For Students
- **Visual Learning** - See exactly how algorithms work step-by-step
- **Variable Tracking** - Understand what each variable does
- **Performance Comparison** - Learn which algorithms are more efficient
- **Interactive Practice** - Try different inputs and see results

### For Educators
- **Teaching Tool** - Demonstrate algorithms in real-time
- **Comparative Analysis** - Show trade-offs between different approaches
- **Engagement** - Interactive learning keeps students interested
- **Assessment** - Students can experiment and learn independently

### For Developers
- **Interview Prep** - Refresh knowledge of sorting algorithms
- **Performance Analysis** - Understand when to use each algorithm
- **Code Reference** - See clean implementations of each algorithm
- **Complexity Understanding** - Visual representation of Big O notation



### Areas for Contribution
- Additional sorting algorithms (Counting Sort, Bucket Sort, etc.)
- More visualization options
- Performance optimizations
- Mobile responsiveness improvements
- Accessibility enhancements
- Unit tests

## 📝 Algorithm Implementations

All sorting algorithms are implemented with:
- **Step-by-step tracking** for visualization
- **Performance metrics** counting
- **Educational comments** explaining logic
- **Beginner-friendly variable names**





*AlgoCompare - Making sorting algorithms visual, interactive, and fun to learn!*
