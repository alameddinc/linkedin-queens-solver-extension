# 👑 LinkedIn Queens Solver

> A Chrome extension that automatically solves the LinkedIn Queens game using a backtracking algorithm.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen.svg)](https://www.google.com/chrome/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- ✅ **Auto-Solve**: Automatically solve the entire game with one click
- 👁️ **Visual Hints**: Shows you where to place queens with colored highlights
- ⚡ **Fast & Accurate**: Uses efficient backtracking algorithm for quick solutions
- 🎨 **Modern UI**: Clean, user-friendly interface with floating action button
- 🔄 **Auto-Detection**: Automatically detects the game on LinkedIn pages
- 🎯 **Smart Highlighting**: Different colors for existing queens vs. new placements

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/alameddinc/linkedin-queens-solver-extension.git
cd linkedin-queens-solver-extension
```

### 2. Load Extension in Chrome

1. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```

2. Enable **Developer mode** (toggle in the top-right corner)

3. Click **"Load unpacked"** button

4. Select the cloned `linkedin-queens-solver-extension` directory

5. The extension is now installed! 🎉

### 3. Optional: Add Icons

Icons are not included by default. To add them:

1. Create queen icons in three sizes: 16x16, 48x48, and 128x128 pixels
2. Save them in an `icons/` directory with these names:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

The extension works fine without icons.

## 🎮 Usage

1. Navigate to [LinkedIn](https://linkedin.com)

2. Go to the Queens game (find it in the Games section)

3. Click the **👑** floating button that appears in the bottom-right corner

4. Choose your preferred option:
   - **🤖 Auto-Solve**: Automatically places all queens on the board
   - **👁️ Show Solution**: Highlights the solution but lets you place queens manually
   - **❌ Hide**: Removes all highlights

## 🎨 Color System

The extension uses a color-coded system to differentiate between different types of queens:

### In LinkedIn Extension:
- 🟢 **Green highlight + white number**: New solution positions (queens not yet placed)
- 🟡 **Gold highlight + dark number**: Existing queens (already placed on the board)

### In Test Page:
- 🟢 **Green border**: Solution position not yet filled
- 🟡 **Gold border**: Manually placed queen that's part of the solution
- **♛ Symbol**: Manually placed queen
- **✕ Mark**: Blocked cell
- **Number**: Placement order indicator

## 🔧 How It Works

### Algorithm

The extension solves the classic **N-Queens problem** using a **backtracking algorithm**:

1. **Analyze Board**: Detects the current board state
2. **Identify Constraints**: Finds existing queens and blocked cells
3. **Backtracking Search**: Tries all possible queen placements
4. **Constraint Validation**: Ensures no queens attack each other
5. **Display Solution**: Highlights valid positions

### Backtracking Implementation

```javascript
function solveNQueens(col, blockedCells) {
  if (col >= size) return true; // All queens placed successfully

  for (let row = 0; row < size; row++) {
    if (isSafe(row, col, blockedCells)) {
      board[row][col] = 1;

      if (solveNQueens(col + 1, blockedCells)) {
        return true;
      }

      board[row][col] = 0; // Backtrack
    }
  }

  return false;
}
```

### Safety Check

```javascript
function isSafe(row, col, blockedCells) {
  // Check row for conflicts
  // Check column for conflicts
  // Check both diagonals (4 directions)
  // Check if cell is blocked
}
```

## 🧪 Testing

A standalone test page (`test-demo.html`) is included for testing the algorithm:

1. Open `test-demo.html` in your browser

2. Features:
   - **Board Sizes**: Test with 4x4 to 10x10 grids
   - **Manual Placement**: Click to place queens or blocked cells
   - **Solve**: See the algorithm find solutions
   - **Step-by-Step**: Watch the solution build incrementally
   - **Random Blocks**: Generate random obstacles
   - **Statistics**: View solve time and board metrics

3. Color coding in test page matches the extension

## 📁 Project Structure

```
linkedin-queens-solver-extension/
├── manifest.json          # Chrome extension configuration
├── solver.js              # N-Queens backtracking algorithm
├── content.js             # LinkedIn page interaction logic
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality
├── styles.css             # Visual styling
├── test-demo.html         # Standalone testing page
└── README.md              # This file
```

## 🐛 Troubleshooting

### Extension Not Working

1. Ensure the extension is **enabled** in `chrome://extensions/`
2. Refresh the LinkedIn page (F5)
3. Open DevTools Console (F12) and check for errors
4. Make sure you're on the Queens game page

### "Game Not Found" Error

1. Verify the Queens game is actually open
2. Refresh the page
3. Wait a few seconds for the game to fully load
4. Check if LinkedIn updated their DOM structure

### "No Solution Found"

This is normal in some cases:
- The current board state may be unsolvable
- Existing queen placements may block all valid solutions
- Try resetting the game and solving from scratch

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚀 Future Features

- [ ] Multiple solution viewer
- [ ] Solution animations
- [ ] Statistics tracking across sessions
- [ ] Alternative solving strategies
- [ ] Dark mode support
- [ ] Internationalization (i18n)

## 📝 License

This project is for educational purposes. Please use it in accordance with LinkedIn's Terms of Service.

## ⚠️ Disclaimer

This extension is an educational project demonstrating the N-Queens algorithm. It is not affiliated with, endorsed by, or officially connected to LinkedIn in any way.

## 🎓 Technical Details

### Algorithm Complexity
- **Time Complexity**: O(N!) in worst case
- **Space Complexity**: O(N²) for board representation
- **Optimization**: Early pruning with constraint checking

### Browser Compatibility
- Chrome 88+
- Edge 88+
- Any Chromium-based browser with Manifest V3 support

### LinkedIn DOM Integration
The extension uses LinkedIn's data attributes for game detection:
- `[data-testid="interactive-grid"]` - Game board container
- `[data-cell-idx]` - Individual cell identification
- `aria-label` attributes - Cell state detection (queened/crossed)

---

**Made with ❤️ for LinkedIn gamers and algorithm enthusiasts**

### Star History

If this project helps you, please consider giving it a ⭐️!
