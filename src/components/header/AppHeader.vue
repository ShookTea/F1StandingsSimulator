<template>
    <header>
        <h1>F1 Season Simulator</h1>
        <div class="header-control-block">
            <season-selector v-for="(sport, index) in allData"
                             :key="index"
                             :enabled="option === index"
                             :sport-data="sport"
                             @enable="option = index"/>
        </div>
    </header>
</template>

<script lang="ts">
import SeasonSelector from '@/components/header/SeasonSelector.vue';
import allData from '@/data/sim/data';

export default {
    components: { SeasonSelector },
    data() {
        return {
            allData,
            option: 0
        }
    }
}
</script>

<style scoped>
    header {
        background-color: darkblue;
        padding-left: 1em;
    }
    h1 {
        margin-top: 0;
        margin-bottom: 0;
        color: white;
    }
    .header-control-block {
        color: white;
        padding-bottom: 0.1em;
        display: flex;
        flex-direction: row;
    }
</style>