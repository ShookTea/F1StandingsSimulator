<script lang="ts" setup>
import { Standing } from '@/data/sim/f1/simDataTypes';
import { useWindowWidth } from '@/composable/windowWidth';

interface Props {
    standings: Standing[]
}

defineProps<Props>();
const { windowWidth } = useWindowWidth();
</script>
<template>
    <thead>
        <tr>
            <th rowspan="2">Current Position</th>
            <th rowspan="2">Driver</th>
            <th rowspan="2">Points</th>
            <th :colspan="windowWidth > 1000 ? standings.length : 3">Possible positions at the end of season</th>
        </tr>
        <tr v-if="windowWidth > 1000">
            <th v-for="index in standings.length" :key="index">{{ index }}</th>
        </tr>
        <tr v-else>
            <th>Best</th>
            <th>Current</th>
            <th>Worst</th>
        </tr>
    </thead>
</template>

<style>
th {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
}
</style>