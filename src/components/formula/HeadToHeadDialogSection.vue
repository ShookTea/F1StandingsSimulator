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
  colspan: number;
}

const cellData = computed<CellInfo[][]>(() => {
  const result: CellInfo[][] = [];

  for (const option of driverOptions.value) {
    if (option.position > props.season.driversPerRace) {
      continue;
    }

    const row: CellInfo[] = [];

    row.push({
      value: option.position,
      label: `P${option.position}`,
      colspan: 1,
    })

    for (const rival of rivals.value) {
      const value = option.rivals[rival];
      let label = `P${value} or worse`;

      if (value === 1 || (value === 2 && option.position === 1)) {
        label = 'Anywhere';
      } else if (value === 2 || (value === 3 && option.position === 2)) {
        label = 'No race win';
      }

      row.push({
        value,
        label,
        colspan: 1,
      });
    }

    result.push(row);
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
          <td v-for="(cell, j) in row" :key="j">{{ cell.label }}</td>
        </tr>
      </tbody>
    </table>
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
</style>