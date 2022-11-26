<template>
    <div class="simulation-view">
        <h3>{{ { meta: $route.meta, params: $route.params } }}</h3>
        <simulation-pager label="foo" route-key="step" :max-pages="10"/>
        <simulation-season-view :season-data="seasonData"/>
    </div>
</template>

<script lang="ts">
import allData from '@/data/sim/data';
import SimulationSeasonView from '@/components/SimulationSeasonView.vue';
import SimulationPager from '@/components/SimulationPager.vue';

export default {
    components: { SimulationPager, SimulationSeasonView },
    computed: {
        seasonData() {
            const sportData = allData.find(entry => entry.routePart === this.$route.meta.sport);
            return sportData.data.find(entry => entry.routePart === this.$route.meta.season);
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