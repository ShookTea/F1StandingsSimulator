<template>
    <div class="simulation-view">
        <formula-round-pager :label="currentPage.roundName" route-key="step" :max-pages="seasonData.data.length"/>
        <formula-round-table :round="currentPage"/>
    </div>
</template>

<script lang="ts">
import allData, { GroupData } from '@/data/sim/data';
import { Round, Season } from '@/data/sim/f1/simDataTypes';
import FormulaRoundPager from '@/components/formula/FormulaRoundPager.vue';
import FormulaRoundTable from '@/components/formula/FormulaRoundTable.vue';

export default {
    components: { FormulaRoundTable, FormulaRoundPager },
    computed: {
        seasonData(): GroupData<Season> {
            const sportData = allData.find(entry => entry.routePart === this.$route.meta.sport);
            return <GroupData<Season>><unknown>sportData.data.find(entry => entry.routePart === this.$route.meta.season);
        },
        currentPage(): Round {
            const step: number = parseInt(this.$route.params.step) - 1;

            return this.seasonData.data[step];
        },
    }
}
</script>
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