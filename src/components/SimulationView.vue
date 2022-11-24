<template>
    <div class="simulation-view">
        <div class="simulation-view-selector">
            <label for="season-selector">Choose season:</label>
            <select id="season-selector" v-model="selectedYear">
                <option v-for="option in options" :value="option.value">{{ option.text }}</option>
            </select>
        </div>
        <simulation-season-view :season-data="yearData"/>
    </div>
</template>

<script lang="ts">
import allYears, { newestYear } from '@/data/sim/simData';
import SimulationSeasonView from '@/components/SimulationSeasonView.vue';

export default {
    components: { SimulationSeasonView },
    data() {
        return {
            options: Object.keys(allYears)
                .sort().reverse()
                .map(year => ({ text: `Season ${year}`, value: year })),
            selectedYear: newestYear,
        }
    },
    computed: {
        yearData() {
            return allYears[this.selectedYear];
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