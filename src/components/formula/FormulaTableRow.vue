<script lang="ts" setup>
import { useWindowWidth } from '@/composable/windowWidth';
import { Standing } from '@/data/sim/f1/simDataTypes';
import FormulaLargeTableCell from '@/components/formula/FormulaLargeTableCell.vue';
import FormulaSmallTableCell from '@/components/formula/FormulaSmallTableCell.vue';

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
        <th class="pre-cell">{{ standing.driverNumber }}</th>
        <th class="pre-cell">{{ standing.driver }}</th>
        <th class="pre-cell">{{ standing.points }}</th>
        <template v-if="windowWidth > 1000">
            <formula-large-table-cell v-for="index in standingsCount" :key="index" :position="index" :standing="standing"/>
        </template>
        <template v-else>
            <formula-small-table-cell :standing="standing" type="best"/>
            <formula-small-table-cell :standing="standing" type="current"/>
            <formula-small-table-cell :standing="standing" type="worst"/>
        </template>
    </tr>
</template>

<style>
th {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
    width: 3.5em;
}
</style>