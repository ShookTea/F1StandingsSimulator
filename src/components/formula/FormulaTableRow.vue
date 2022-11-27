<script lang="ts" setup>
import { useWindowWidth } from '@/composable/windowWidth';
import { Standing } from '@/data/sim/f1/simDataTypes';

interface Props {
    index: number
    standingsCount: number
    standing: Standing
}

defineProps<Props>();
const { windowWidth } = useWindowWidth();
</script>

<template>
    <tr>
        <th class="pre-cell">{{ index + 1 }}</th>
        <th class="pre-cell">{{ standing.driver }}</th>
        <th class="pre-cell">{{ standing.points }}</th>
        <template v-if="windowWidth > 1000">
            <td v-for="index in standingsCount" :key="index" class="cell"><div class="cell-interior"></div></td>
        </template>
        <template v-else>
            <td class="cell">{{ standing.maxPosition }}</td>
            <td class="cell">{{ standing.position }}</td>
            <td class="cell">{{ standing.minPosition }}</td>
        </template>
    </tr>
</template>

<style>
td, th {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
}

.pre-cell {
    width: 3.5em;
}
.cell {
    height: 2em;
    width: 3em;
    padding: 0;
}
.solved {
    background-color: goldenrod;
    border-radius: 25%;
}
.min, .min-current {
    background-color: lightgreen;
    border-bottom-right-radius: 25%;
    border-top-right-radius: 25%;
}
.max, .max-current {
    background-color: lightgreen;
    border-bottom-left-radius: 25%;
    border-top-left-radius: 25%;
}
.in, .in-current {
    background-color: lightgreen;
}
.min-current .cell-interior, .max-current .cell-interior, .in-current .cell-interior {
    background-color: darkgreen;
    border-radius: 25%;
    width: 100%;
    height: 100%;
}
</style>