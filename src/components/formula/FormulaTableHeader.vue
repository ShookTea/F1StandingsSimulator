<script lang="ts" setup>
import { Standing } from '@/data/sim/f1/simDataTypes';
import { useWindowWidth } from '@/composable/windowWidth';

interface Props {
    standings: Standing<any>[]
    showNumberColumn?: boolean
    nameLabel: string
}

withDefaults(defineProps<Props>(), {
    showNumberColumn: false,
});
const { windowWidth } = useWindowWidth();
</script>
<template>
    <thead>
        <tr>
            <th v-if="showNumberColumn" rowspan="2">No</th>
            <th rowspan="2">{{ nameLabel }}</th>
            <th rowspan="2">Points</th>
            <th :colspan="windowWidth > 1000 ? standings.length : 3">Possible positions at the end of season</th>
        </tr>
        <tr v-if="windowWidth > 1000">
            <th class="position-header" v-for="index in standings.length" :key="index">{{ index }}</th>
        </tr>
        <tr v-else>
            <th class="position-header">Best</th>
            <th class="position-header"></th>
            <th class="position-header">Worst</th>
        </tr>
    </thead>
</template>

<style>
th {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
}
th.position-header {
    border-left: none;
    border-right: none;
}
</style>