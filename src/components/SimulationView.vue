<template>
    <div class="simulation-view">
        <h3>{{ { meta: $route.meta, params: $route.params } }}</h3>
        <simulation-pager label="foo" route-key="step" :max-pages="seasonData.data.length"/>
        <simulation-season-view :season-data="seasonData"/>
    </div>
</template>

<script lang="ts">
import allData, { SeasonData } from '@/data/sim/data';
import SimulationSeasonView from '@/components/SimulationSeasonView.vue';
import SimulationPager from '@/components/SimulationPager.vue';
import { Season } from '@/data/sim/f1/simDataTypes';

export default {
    components: { SimulationPager, SimulationSeasonView },
    computed: {
        seasonData(): SeasonData<Season> {
            const sportData = allData.find(entry => entry.routePart === this.$route.meta.sport);
            return <SeasonData<Season>><unknown>sportData.data.find(entry => entry.routePart === this.$route.meta.season);
        }
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