<template>
  <div class='row sudoku-block'>
    <div class='col-4 sudoku-cell' v-for='k in 9' :key='k'>
      <sudoku-cell></sudoku-cell>
    </div>
  </div>
</template>

<script setup lang='ts'>
import SudokuCell from './SudokuCell.vue';
</script>

<style scoped>
.sudoku-block {
  border: 2px black solid;
}
.sudoku-cell {
  aspect-ratio: 1 / 1;
}
</style>
