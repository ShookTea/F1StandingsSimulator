<script lang="ts" setup>
import allData, { GroupData } from '@/data/sim/data';
import { Round, Season } from '@/data/sim/f1/simDataTypes';
import FormulaRoundPager from '@/components/formula/FormulaRoundPager.vue';
import FormulaRoundTable from '@/components/formula/FormulaRoundTable.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const seasonData = computed<GroupData<Season>>(() => {
    const sportData = allData.find(entry => entry.routePart === route.meta.sport);
    return <GroupData<Season>><unknown>sportData.data.find(entry => entry.routePart === route.meta.season);
});

const currentPage = computed<Round>(() => {
    const step: number = parseInt(route.params.step as string) - 1;
    return seasonData.value.data[step];
});
</script>

<template>
    <div class="simulation-view">
        <formula-round-pager :label="currentPage.roundName" route-key="step" :max-pages="seasonData.data.length"/>
        <formula-round-table :round="currentPage"/>
    </div>
</template>

<style scoped>
.simulation-view {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.simulation-view-selector label {
    font-weight: bold;
    font-size: 1.2em;
}

.simulation-view-selector select {
    font-size: 1.2em;
}
</style>