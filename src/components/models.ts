import * as Sudoku from './Sudoku';

export type DosukuDifficulty = 'Easy'|'Medium'|'Hard';
export type DosukuCell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface DosukuGrid {
  value: Array<Array<DosukuCell>>,
  solution: Array<Array<DosukuCell>>,
  difficulty: DosukuDifficulty,
}

export interface DosukuResponse {
  newboard: {
    grids: Array<DosukuGrid>
  };
}
