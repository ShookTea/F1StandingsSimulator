<script lang="ts" setup>
import { HeadToHead, HeadToHeadOptionForDriver, Season } from '@/data/sim/f1/simDataTypes';
import { computed } from 'vue';

const props = defineProps<{
  season: Season;
  headToHead: HeadToHead;
  driverAbbr: string;
  ordinal: string;
}>();

const driverOptions = computed<HeadToHeadOptionForDriver[]>(() => props.headToHead.optionsByDriver[props.driverAbbr]);
const rivals = computed<string[]>(() => props.headToHead.drivers.filter((d) => d !== props.driverAbbr));

type CellInfo = {
  value: number;
  label: string;
  rowspan: number;
}

const labelToColor = (label: string) => {
  switch (label) {
    case 'Anywhere':
      return 'lightgreen';
    case 'P1':
    case 'P1 or worse':
      return 'gold';
    case 'P2':
    case 'P2 or worse':
      return 'silver';
    case 'P3':
    case 'P3 or worse':
      return 'lightsalmon';
    default:
      return 'white';
  }
}

const cellData = computed<CellInfo[][]>(() => {
  let result: CellInfo[][] = [];

  // Build basic data
  for (const option of driverOptions.value) {
    if (option.position > props.season.driversPerRace) {
      continue;
    }

    const row: CellInfo[] = [];

    row.push({
      value: option.position,
      label: `P${option.position}`,
      rowspan: 1,
    })

    for (const rival of rivals.value) {
      const value = option.rivals[rival];
      let label = `P${value} or worse`;

      if (value === 1 || (value === 2 && option.position === 1)) {
        label = 'Anywhere';
      }

      row.push({
        value,
        label,
        rowspan: 1,
      });
    }

    result.push(row);
  }

  // If table reaches the season.driversPerRace, truncate identical positions at the end of table
  if (result.length === props.season.driversPerRace) {
    const lastElement = result[result.length - 1];
    const rival1 = lastElement[1].value;
    const rival2 = lastElement[2]?.value;
    let truncateCount = 0;
    for (let i = result.length - 1; i >= 0 && result[i][1].value === rival1 && result[i][2]?.value === rival2; i--) {
      truncateCount++;
    }
    result = result.slice(0, result.length - truncateCount + 1);
    result[result.length - 1][0].label += '+';
  }

  // Starting from the end of array, ignoring first column: if next row at the same column has the same value,
  // remove it and add its rowspan
  for (let currRow = result.length - 2; currRow >= 0; currRow--) {
    for (let column = 1; column < result[currRow].length; column++) {
      if (result[currRow][column].label === result[currRow + 1][column].label) {
        result[currRow][column].rowspan = result[currRow + 1][column].rowspan + 1;
        result[currRow + 1][column] = null;
      }
    }
  }

  return result;
});
</script>

<template>
  <div class="battle-section">
    <h5>{{ driverAbbr }} wins the {{ ordinal }} place if:</h5>
    <p v-if="!driverOptions || driverOptions.length === 0">No scenarios with guaranteed win.</p>
    <table v-else>
      <colgroup v-if="rivals.length === 1">
        <col :style="{ width: '40%' }"/>
        <col :style="{ width: '60%' }"/>
      </colgroup>
      <colgroup v-else-if="rivals.length === 2">
        <col :style="{ width: '20%' }"/>
        <col :style="{ width: '40%' }"/>
        <col :style="{ width: '40%' }"/>
      </colgroup>
      <thead>
        <tr>
          <th>{{ driverAbbr }}</th>
          <th v-for="abbr in rivals" :key="abbr">{{ abbr }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in cellData" :key="i">
          <td
            v-for="(cell, j) in row.filter((r) => r !== null)"
            :key="j"
            :style="{ backgroundColor: labelToColor(cell.label)}"
            :rowspan="cell.rowspan"
          >
            {{ cell.label }}
          </td>
        </tr>
      </tbody>
    </table>
    <p class="other-positions-label" v-if="driverOptions.length > 0 && driverOptions.length < season.driversPerRace">
      Other race positions won't guarantee a win.
    </p>
  </div>

</template>
<style scoped>
  .battle-section {
    display: flex;
    flex-direction: column;
  }

  .battle-section h5 {
    margin: 0;
  }

  .battle-section table, .battle-section tr, .battle-section td, .battle-section th {
    border-collapse: collapse;
    border: 1px solid black;
    text-align: center;
  }

  .other-positions-label {
    font-size: 0.8em;
    text-align: center;
  }
</style>