<template>
  <table class='sudoku-grid'>
    <tr v-for='(row, rowIndex) in grid' :key="'row-' + rowIndex">
      <td
        v-for='(cell, cellIndex) in row'
        :key="'cell-' + rowIndex + '-' + cellIndex"
        class='sudoku-cell'
      >
        <input
          type='number'
          :data-row='rowIndex'
          :data-col='cellIndex'
          v-model='cell.value'
          :readonly='cell.readonly'
          @input='validate_input'
        >
      </td>
    </tr>
  </table>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue';
import { Grid, isGridCellValue } from './Sudoku';

interface Props {
  grid: Grid,
}

const props = defineProps<Props>();
const { grid } = toRefs(props);

function validate_input(ev: InputEvent) {
  const el = ev.target as HTMLInputElement;
  const row = parseInt(el.dataset.row ?? '');
  const col = parseInt(el.dataset.col ?? '');
  const input = parseInt(ev.data ?? '');
  el.value = isGridCellValue(input) ? input.toString() : '';
  grid.value[row][col].value = isGridCellValue(input) ? input : null;
}
</script>

<style scoped lang='scss'>
.sudoku-grid {
  width: 100%;
  height: 100%;
  border-spacing: 0;
  border: solid 4px black;

  tr {
    &:nth-child(3), &:nth-child(6) {
      .sudoku-cell {
        border-bottom: solid 2px black;
      }
    }

    &:nth-child(4), &:nth-child(7) {
      .sudoku-cell {
        border-top: solid 2px black;
      }
    }

    .sudoku-cell {
      padding: 0;
      text-align: center;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      input {
        -moz-appearance: textfield;
        width: 100%;
        height: 100%;
        border-style: none;
        text-align: center;
        font-size: x-large;

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &:focus {
          outline: none;
        }

        &:read-only {
          background-color: lightgray;
        }
      }

      &:nth-child(3), &:nth-child(6) {
        border-right: 2px solid black;
      }

      &:nth-child(4), &:nth-child(7) {
        border-left: 2px solid black;
      }
    }
  }
}
</style>
