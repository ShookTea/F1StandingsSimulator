<template>
    <header>
        <h1>F1 Season Simulator</h1>
        <div class="header-control-block">
            <season-selector :enabled="option === 0" @enable="option = 0" label="Formula 1" :available-values="options" path-part="f1"/>
            <season-selector :enabled="option === 1" @enable="option = 1" label="Formula 2" :available-values="options" path-part="f2"/>
        </div>
    </header>
</template>

<script lang="ts">
import SeasonSelector from '@/components/header/SeasonSelector.vue';
export default {
    components: { SeasonSelector },
    data() {
        return {
            options: [{
                text: 'Season 2022',
                value: 2022,
            }, {
                text: 'Season 2021',
                value: 2021,
            }],
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
        padding-bottom: 1em;
        display: flex;
        flex-direction: row;
    }
</style>