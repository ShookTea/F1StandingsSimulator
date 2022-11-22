<template>
    <div class="simulation-view">
        <select class="simulation-view-selector" v-model="selectedYear">
            <option v-for="option in options" :value="option.value">{{ option.text }}</option>
        </select>
        <simulation-season-view :season-data="yearData"/>
    </div>
</template>

<script>
import allYears, { newestYear } from '@/data/sim/simData';
import SimulationSeasonView from '@/components/SimulationSeasonView.vue';

export default {
    components: { SimulationSeasonView },
    data() {
        return {
            options: Object.keys(allYears).map(year => ({ text: `Season ${year}`, value: year })),
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