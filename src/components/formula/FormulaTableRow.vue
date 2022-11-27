<script lang="ts" setup>
import { useWindowWidth } from '@/composable/windowWidth';
import { Standing } from '@/data/sim/f1/simDataTypes';
import FormulaLargeTableCell from '@/components/formula/FormulaLargeTableCell.vue';

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
            <formula-large-table-cell v-for="index in standingsCount" :key="index" :position="index" :standing="standing"/>
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
</style>