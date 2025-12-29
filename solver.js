/**
 * LinkedIn Queens Solver
 * N-Queens problem solver using backtracking algorithm
 */

class QueensSolver {
  constructor(size) {
    this.size = size;
    this.board = Array(size).fill().map(() => Array(size).fill(0));
    this.solution = [];
  }

  /**
   * Check if placing a queen at (row, col) is safe
   */
  isSafe(row, col, blockedCells) {
    // Check if this cell is blocked
    if (blockedCells && blockedCells.has(`${row},${col}`)) {
      return false;
    }

    // Check row
    for (let j = 0; j < this.size; j++) {
      if (this.board[row][j] === 1) {
        return false;
      }
    }

    // Check column
    for (let i = 0; i < this.size; i++) {
      if (this.board[i][col] === 1) {
        return false;
      }
    }

    // Check upper left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (this.board[i][j] === 1) {
        return false;
      }
    }

    // Check upper right diagonal
    for (let i = row, j = col; i >= 0 && j < this.size; i--, j++) {
      if (this.board[i][j] === 1) {
        return false;
      }
    }

    // Check lower left diagonal
    for (let i = row, j = col; i < this.size && j >= 0; i++, j--) {
      if (this.board[i][j] === 1) {
        return false;
      }
    }

    // Check lower right diagonal
    for (let i = row, j = col; i < this.size && j < this.size; i++, j++) {
      if (this.board[i][j] === 1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Solve N-Queens using backtracking
   */
  solveNQueens(col, blockedCells) {
    if (col >= this.size) {
      // All queens placed successfully
      return true;
    }

    for (let row = 0; row < this.size; row++) {
      if (this.isSafe(row, col, blockedCells)) {
        this.board[row][col] = 1;
        this.solution.push({ row, col, cellIndex: row * this.size + col });

        if (this.solveNQueens(col + 1, blockedCells)) {
          return true;
        }

        // Backtrack
        this.board[row][col] = 0;
        this.solution.pop();
      }
    }

    return false;
  }

  /**
   * Get the solution
   */
  solve(blockedCells) {
    this.board = Array(this.size).fill().map(() => Array(this.size).fill(0));
    this.solution = [];

    if (this.solveNQueens(0, blockedCells)) {
      return this.solution;
    }

    return null;
  }

  /**
   * Get solution as cell indices
   */
  getSolutionIndices(blockedCells) {
    const solution = this.solve(blockedCells);
    if (solution) {
      return solution.map(pos => pos.cellIndex);
    }
    return null;
  }
}

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QueensSolver;
}
