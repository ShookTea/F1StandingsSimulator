<script lang="ts" setup>
import { HeadToHead, HeadToHeadOptionForDriver } from '@/data/sim/f1/simDataTypes';
import { computed } from 'vue';

const props = defineProps<{
  headToHead: HeadToHead;
  driverAbbr: string;
  ordinal: string;
}>();

const driverOptions = computed<HeadToHeadOptionForDriver[]>(() => props.headToHead.optionsByDriver[props.driverAbbr]);
</script>

<template>
  <div class="battle-section">
    <h5>{{ driverAbbr }} wins the {{ ordinal }} place if:</h5>
    <p v-if="!driverOptions || driverOptions.length === 0">No scenarios with guaranteed win.</p>
    <table v-else>
      <thead></thead>
    </table>
  </div>

</template>
<style scoped>
  .battle-section {
    display: flex;
    flex-direction: column;
  }

  h5 {
    margin: 0;
  }
</style>