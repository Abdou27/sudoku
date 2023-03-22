<template>
  <div class='page'>
    <q-toolbar class='bg-primary text-white'>
      <q-toolbar-title>
        <q-avatar>
          <img src='https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg' alt='logo'>
        </q-avatar>
        Sudoku
      </q-toolbar-title>
      <q-space></q-space>
      <div>
        <q-select :options='difficulty_options' dense :model-value='difficulty' v-model='difficulty' @update:model-value='fetch_board'></q-select>
      </div>
    </q-toolbar>
    <div class='sudoku-container'>
      <sudoku-grid v-if='grid' :grid='grid'></sudoku-grid>
    </div>
    <teleport to='body'>
      <q-fab
        icon='add'
        direction='up'
        color='accent'
        class='fab'
      >
        <q-fab-action @click='fetch_board' color='primary' icon='refresh' />
      </q-fab>
    </teleport>
  </div>
</template>

<script setup lang='ts'>
import SudokuGrid from 'components/SudokuGrid.vue';
import { DosukuDifficulty, DosukuGrid, DosukuResponse, Grid, GridCell, GridCellValue } from 'components/models';
import { onMounted, ref } from 'vue';

const grid = ref<Grid>();
const difficulty = ref<DosukuDifficulty>('Medium');
const difficulty_options = [
  'Easy',
  'Medium',
  'Hard'
];

function transform_grid(dosuku_grid: DosukuGrid): Grid {
  const grid: Grid = [];
  for (const row in dosuku_grid.value) {
    const grid_row = [];
    for (const col in dosuku_grid.value[row]) {
      grid_row.push({
        readonly: dosuku_grid.value[row][col] !== 0,
        value: dosuku_grid.value[row][col] == 0 ? null : dosuku_grid.value[row][col] as GridCellValue
      } as GridCell);
    }
    grid.push(grid_row);
  }
  return grid;
}

async function fetch_board() {
  do {
    console.log('fetching boards');
    const req: Response = await fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:10){grids{value,solution,difficulty}}}');
    const res: DosukuResponse = await req.json();
    for (const grid_idx in res.newboard.grids) {
      const dosuku_grid: DosukuGrid = res.newboard.grids[grid_idx];
      if (dosuku_grid.difficulty === difficulty.value) {
        console.log(dosuku_grid);
        grid.value = transform_grid(dosuku_grid);
        return;
      }
    }
  } while (true);
}

onMounted(fetch_board);
</script>

<style lang='scss' scoped>
.page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.sudoku-container {
  padding: 10px;
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1 / 1;
  overflow: auto;
  margin: auto;
}

.fab {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
