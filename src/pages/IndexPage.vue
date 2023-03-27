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
import {create_partial_solution, Grid, GridCell, GridCellValue} from 'components/Sudoku';
import { onMounted, ref } from 'vue';

const grid = ref<Grid>();
const difficulty = ref<number>(3);
const difficulty_options = [1, 2, 3, 4, 5];

function fetch_board() {
  grid.value = create_partial_solution(difficulty.value);
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
