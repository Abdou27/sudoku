export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

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

export type Grid = Array<Array<GridCell>>

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
