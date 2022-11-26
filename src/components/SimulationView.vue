<template>
    <div class="simulation-view">
        <simulation-pager :label="currentPage.roundName" route-key="step" :max-pages="seasonData.data.length"/>
        <simulation-table :data="currentPage"/>
    </div>
</template>

<script lang="ts">
import allData, { SeasonData } from '@/data/sim/data';
import SimulationSeasonView from '@/components/SimulationSeasonView.vue';
import SimulationPager from '@/components/SimulationPager.vue';
import { Round, Season } from '@/data/sim/f1/simDataTypes';
import SimulationTable from '@/components/SimulationTable.vue';

export default {
    components: { SimulationTable, SimulationPager, SimulationSeasonView },
    computed: {
        seasonData(): SeasonData<Season> {
            const sportData = allData.find(entry => entry.routePart === this.$route.meta.sport);
            return <SeasonData<Season>><unknown>sportData.data.find(entry => entry.routePart === this.$route.meta.season);
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
.simulation-view-selector {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: .2em;
}

.simulation-view-selector label {
    font-weight: bold;
    font-size: 1.2em;
}

.simulation-view-selector select {
    font-size: 1.2em;
}
</style>