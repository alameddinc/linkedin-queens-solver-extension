/**
 * LinkedIn Queens Solver - Content Script
 * Automatically detects and solves the Queens game
 */

class LinkedInQueensSolverUI {
  constructor() {
    this.gridSize = 7;
    this.gameBoard = null;
    this.cells = [];
    this.solution = null;
    this.initialized = false;
  }

  /**
   * Wait for game board to be loaded
   */
  async waitForGameBoard() {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const board = document.querySelector('[data-testid="interactive-grid"]');
        if (board) {
          clearInterval(checkInterval);
          resolve(board);
        }
      }, 500);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve(null);
      }, 10000);
    });
  }

  /**
   * Parse the current game state
   */
  parseGameState() {
    this.gameBoard = document.querySelector('[data-testid="interactive-grid"]');

    if (!this.gameBoard) {
      console.log('🎯 Queens game board not found!');
      return false;
    }

    // Get all cells
    this.cells = Array.from(this.gameBoard.querySelectorAll('[data-cell-idx]'));

    if (this.cells.length === 0) {
      console.log('🎯 No cells found!');
      return false;
    }

    // Determine grid size
    this.gridSize = Math.sqrt(this.cells.length);
    console.log(`🎯 Found ${this.cells.length} cells, grid size: ${this.gridSize}x${this.gridSize}`);

    return true;
  }

  /**
   * Get blocked cells (cells that already have queens or are crossed)
   */
  getBlockedCells() {
    const blocked = new Set();
    const queenPositions = [];

    this.cells.forEach((cell, index) => {
      const cellIdx = parseInt(cell.getAttribute('data-cell-idx'));

      // Check if cell has a queen (queened_cell_aria_label)
      const ariaLabel = cell.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.includes('queened')) {
        const row = Math.floor(cellIdx / this.gridSize);
        const col = cellIdx % this.gridSize;
        queenPositions.push({ row, col, cellIndex: cellIdx });

        // Block the entire row, column, and diagonals
        this.blockQueenPath(blocked, row, col);
      }

      // Check if cell is crossed (crossed_cell_aria_label)
      if (ariaLabel && ariaLabel.includes('crossed')) {
        const row = Math.floor(cellIdx / this.gridSize);
        const col = cellIdx % this.gridSize;
        blocked.add(`${row},${col}`);
      }
    });

    console.log(`🎯 Found ${queenPositions.length} existing queens`);
    console.log(`🎯 Blocked cells: ${blocked.size}`);

    return { blocked, queenPositions };
  }

  /**
   * Block cells in the path of a queen
   */
  blockQueenPath(blocked, queenRow, queenCol) {
    // Block entire row
    for (let col = 0; col < this.gridSize; col++) {
      if (col !== queenCol) {
        blocked.add(`${queenRow},${col}`);
      }
    }

    // Block entire column
    for (let row = 0; row < this.gridSize; row++) {
      if (row !== queenRow) {
        blocked.add(`${row},${queenCol}`);
      }
    }

    // Block diagonals
    for (let i = -this.gridSize; i < this.gridSize; i++) {
      // Upper-left to lower-right diagonal
      const r1 = queenRow + i;
      const c1 = queenCol + i;
      if (r1 >= 0 && r1 < this.gridSize && c1 >= 0 && c1 < this.gridSize) {
        if (r1 !== queenRow || c1 !== queenCol) {
          blocked.add(`${r1},${c1}`);
        }
      }

      // Upper-right to lower-left diagonal
      const r2 = queenRow + i;
      const c2 = queenCol - i;
      if (r2 >= 0 && r2 < this.gridSize && c2 >= 0 && c2 < this.gridSize) {
        if (r2 !== queenRow || c2 !== queenCol) {
          blocked.add(`${r2},${c2}`);
        }
      }
    }
  }

  /**
   * Solve the puzzle
   */
  solve() {
    if (!this.parseGameState()) {
      return false;
    }

    const { blocked, queenPositions } = this.getBlockedCells();

    // Check if already solved
    const isSolved = queenPositions.length === this.gridSize;

    if (isSolved) {
      console.log('🎯 Game already solved! Showing complete solution...');

      // For solved games, show all queen positions as solution
      this.solution = queenPositions;
      this.highlightSolution(true); // Pass true to indicate it's already solved
      this.showNotification('Oyun çözülmüş! Tüm vezirler gösteriliyor 👑', 'success');
      return true;
    }

    // Solve using backtracking
    const solver = new QueensSolver(this.gridSize);
    this.solution = solver.solve(blocked);

    if (this.solution) {
      console.log('🎯 Solution found!', this.solution);
      this.highlightSolution(false);
      return true;
    } else {
      console.log('🎯 No solution found!');
      this.showNotification('Çözüm bulunamadı! 😕', 'error');
      return false;
    }
  }

  /**
   * Highlight the solution on the board
   */
  highlightSolution(isSolved = false) {
    // Remove any existing highlights
    this.removeHighlights();

    let solutionCount = 0;

    this.solution.forEach((pos, index) => {
      const cell = this.cells.find(c =>
        parseInt(c.getAttribute('data-cell-idx')) === pos.cellIndex
      );

      if (cell) {
        // Check if cell already has a queen
        const ariaLabel = cell.getAttribute('aria-label');
        const hasQueen = ariaLabel && ariaLabel.includes('queened');

        // Show highlight on all cells (including queens for solved games)
        const highlight = document.createElement('div');
        highlight.className = 'queens-solver-highlight';

        // Different color for existing queens vs new solutions
        const bgColor = hasQueen && isSolved
          ? 'rgba(255, 215, 0, 0.3)' // Gold for existing queens
          : 'rgba(76, 175, 80, 0.3)'; // Green for new solutions
        const borderColor = hasQueen && isSolved
          ? '#FFD700'
          : '#4CAF50';

        highlight.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${bgColor};
          border: 3px solid ${borderColor};
          border-radius: 8px;
          pointer-events: none;
          z-index: 1000;
          animation: pulse 1.5s ease-in-out infinite;
        `;

        // Add number indicator
        const number = document.createElement('div');
        number.className = 'queens-solver-number';
        number.textContent = index + 1;

        const numberBg = hasQueen && isSolved ? '#FFD700' : '#4CAF50';

        number.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: ${numberBg};
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          z-index: 1001;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;

        cell.style.position = 'relative';
        cell.appendChild(highlight);
        cell.appendChild(number);
        solutionCount++;
      }
    });

    if (solutionCount > 0) {
      if (isSolved) {
        this.showNotification(`Tüm ${solutionCount} vezir gösteriliyor! 👑`, 'success');
      } else {
        this.showNotification(`${solutionCount} vezir yerleştir! 👑`, 'success');
      }
      this.showControlPanel();
    }
  }

  /**
   * Remove all highlights
   */
  removeHighlights() {
    document.querySelectorAll('.queens-solver-highlight, .queens-solver-number').forEach(el => {
      el.remove();
    });
  }

  /**
   * Auto-solve by clicking the cells
   */
  async autoSolve() {
    if (!this.solution) {
      this.solve();
    }

    if (!this.solution) {
      return;
    }

    this.showNotification('Otomatik çözüm başlıyor... 🤖', 'info');

    for (const pos of this.solution) {
      const cell = this.cells.find(c =>
        parseInt(c.getAttribute('data-cell-idx')) === pos.cellIndex
      );

      if (cell) {
        const ariaLabel = cell.getAttribute('aria-label');
        if (!ariaLabel || !ariaLabel.includes('queened')) {
          // Click the cell
          cell.click();

          // Wait a bit between clicks for animation
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    }

    this.showNotification('Tamamlandı! 🎉', 'success');
  }

  /**
   * Show control panel
   */
  showControlPanel() {
    // Remove existing panel
    const existingPanel = document.getElementById('queens-solver-panel');
    if (existingPanel) {
      existingPanel.remove();
    }

    const panel = document.createElement('div');
    panel.id = 'queens-solver-panel';
    panel.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-width: 200px;
    `;

    panel.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <h3 style="margin: 0 0 10px 0; color: #0a66c2; font-size: 16px;">
          👑 Queens Solver
        </h3>
        <button id="queens-auto-solve" style="
          background: #0a66c2;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        ">
          🤖 Otomatik Çöz
        </button>
        <button id="queens-show-solution" style="
          background: #57a639;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        ">
          👁️ Çözümü Göster
        </button>
        <button id="queens-hide-solution" style="
          background: #666;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        ">
          ❌ Gizle
        </button>
      </div>
    `;

    document.body.appendChild(panel);

    // Add event listeners
    document.getElementById('queens-auto-solve')?.addEventListener('click', () => {
      this.autoSolve();
    });

    document.getElementById('queens-show-solution')?.addEventListener('click', () => {
      this.solve();
    });

    document.getElementById('queens-hide-solution')?.addEventListener('click', () => {
      this.removeHighlights();
      panel.remove();
    });

    // Hover effects
    ['queens-auto-solve', 'queens-show-solution', 'queens-hide-solution'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('mouseenter', () => {
          btn.style.opacity = '0.9';
          btn.style.transform = 'scale(1.02)';
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.opacity = '1';
          btn.style.transform = 'scale(1)';
        });
      }
    });
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'queens-solver-notification';
    notification.textContent = message;

    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      info: '#2196F3'
    };

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${colors[type] || colors.info};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
      animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideUp 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Initialize the solver
   */
  async init() {
    if (this.initialized) return;

    console.log('🎯 LinkedIn Queens Solver initialized');

    // Wait for game board
    const board = await this.waitForGameBoard();

    if (board) {
      console.log('🎯 Game board found!');

      // Add floating action button
      this.addFloatingButton();

      this.initialized = true;
    } else {
      console.log('🎯 Game board not found on this page');
    }
  }

  /**
   * Add floating action button
   */
  addFloatingButton() {
    // Remove existing button
    const existing = document.getElementById('queens-solver-fab');
    if (existing) {
      existing.remove();
    }

    const fab = document.createElement('button');
    fab.id = 'queens-solver-fab';
    fab.innerHTML = '👑';
    fab.title = 'Queens Solver';
    fab.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      z-index: 9999;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    fab.addEventListener('mouseenter', () => {
      fab.style.transform = 'scale(1.1)';
      fab.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
    });

    fab.addEventListener('mouseleave', () => {
      fab.style.transform = 'scale(1)';
      fab.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
    });

    fab.addEventListener('click', () => {
      this.solve();
    });

    document.body.appendChild(fab);
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize when page loads
const solver = new LinkedInQueensSolverUI();
solver.init();

// Re-initialize when navigating (LinkedIn is a SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(() => solver.init(), 1000);
  }
}).observe(document.body, { childList: true, subtree: true });

console.log('🎯 LinkedIn Queens Solver loaded!');
