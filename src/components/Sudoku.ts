export type GridCellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function isGridCellValue(value: number): value is GridCellValue {
  return (
    Math.floor(value) === value
    &&
    value >= 1
    &&
    value <= 9
  );
}

export interface GridCell {
  readonly: boolean,
  value: GridCellValue | null,
}

// export type GridRow = [GridCell, GridCell, GridCell, GridCell, GridCell, GridCell, GridCell, GridCell, GridCell];
// export type Grid = [GridRow, GridRow, GridRow, GridRow, GridRow, GridRow, GridRow, GridRow, GridRow, GridRow, GridRow, GridRow];
export type GridRow = Array<GridCell>;
export type Grid = Array<GridRow>;

// Utility function to check if a value is valid for a given position
function is_valid(value: GridCellValue, row: number, col: number, grid: Grid): boolean {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i].value === value || grid[i][col].value === value) {
      return false;
    }
  }

  const box_row = Math.floor(row / 3) * 3;
  const box_col = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[box_row + i][box_col + j].value === value) {
        return false;
      }
    }
  }

  return true;
}

// Recursive function to solve the Sudoku grid
export function solve(grid: Grid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === null) {
        for (let value = 1; value <= 9; value++) {
          if (is_valid(value as GridCellValue, row, col, grid)) {
            grid[row][col].value = value as GridCellValue;
            if (solve(grid)) {
              return true;
            }
            grid[row][col].value = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Generates a full solved Sudoku grid, with all cells having readonly: true
function generate_full_sudoku(): Grid {
  const grid: Grid = Array.from({length: 9}, () =>
    Array.from({length: 9}, () => ({readonly: true, value: null}))
  );

  solve(grid);

  return grid;
}

// Check if there's only one solution for the given grid
function is_unique_solution(grid: Grid): boolean {
  const temp_grid: Grid = JSON.parse(JSON.stringify(grid));
  let solution_count = 0;

  function count_solutions(grid: Grid): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col].value === null) {
          for (let value = 1; value <= 9; value++) {
            if (is_valid(value as GridCellValue, row, col, grid)) {
              grid[row][col].value = value as GridCellValue;
              if (count_solutions(grid)) {
                solution_count++;
                if (solution_count > 1) {
                  return false;
                }
              }
              grid[row][col].value = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  count_solutions(temp_grid);

  return solution_count === 1;
}

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function create_partial_solution(difficulty: number): Grid {
  if (difficulty < 1 || difficulty > 5) {
    throw new Error('Difficulty should be between 1 and 5');
  }

  const full_sudoku = generate_full_sudoku();
  const partial_sudoku: Grid = JSON.parse(JSON.stringify(full_sudoku));

  const max_removals = 81 - (17 + (difficulty - 1) * 5);
  let removals = 0;

  const cell_indices = Array.from({ length: 81 }, (_, i) => i);
  shuffle(cell_indices);

  for (const index of cell_indices) {
    if (removals >= max_removals) {
      break;
    }

    const row = Math.floor(index / 9);
    const col = index % 9;
    const cell: GridCell = partial_sudoku[row][col];
    const temp = cell.value;

    if (temp === null) {
      continue;
    }

    cell.value = null;
    if (is_unique_solution(partial_sudoku)) {
      removals++;
      cell.readonly = false;
    } else {
      cell.value = temp;
    }
  }

  return partial_sudoku;
}
