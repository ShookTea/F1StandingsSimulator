<script lang="ts" setup>
import { HeadToHead, HeadToHeadOptionForDriver } from '@/data/sim/f1/simDataTypes';
import { computed } from 'vue';

const props = defineProps<{
  headToHead: HeadToHead;
  driverAbbr: string;
  ordinal: string;
}>();

const driverOptions = computed<HeadToHeadOptionForDriver[]>(() => props.headToHead.optionsByDriver[props.driverAbbr]);
const rivals = computed<string[]>(() => props.headToHead.drivers.filter((d) => d !== props.driverAbbr))
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
        <tr v-for="(option, index) in driverOptions" :key="index">
          <td>P{{ option.position }}</td>
          <td v-for="abbr in rivals" :key="abbr">P{{ option.rivals[abbr] }} or worse</td>
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