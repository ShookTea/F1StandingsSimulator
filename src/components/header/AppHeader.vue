<script lang="ts" setup>
import SeasonSelector from '@/components/header/SeasonSelector.vue';
import allData, { SportData } from '@/data/sim/data';
import OutsideLinkButton from '@/components/header/OutsideLinkButton.vue';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const option = ref<number>(0);

const dataToDisplay = computed<SportData<any>[]>(
    () => allData.filter((d) => d.showInMenu)
);

watch(route, () => {
    option.value = allData.findIndex(d => d.routePart === route.meta.sport);
})

</script>
<template>
    <header>
        <div class="header-main">
            <h1>F1 Season Simulator</h1>
            <SeasonSelector
                v-for="(sport, index) in dataToDisplay"
                :key="index"
                :enabled="option === index"
                :sport-data="sport"
                @enable="option = index"
            />
            
        </div>
        <div class="button-panel">
            <OutsideLinkButton label="Donate" link="https://github.com/sponsors/ShookTea" icon="bi-heart-fill" background-color="lightblue" text-color="black" icon-color="deeppink"/>
            <OutsideLinkButton label="GitHub" link="https://github.com/ShookTea/F1StandingsSimulator" icon="bi-github" background-color="#303030" text-color="white" icon-color="white"/>
        </div>
    </header>
</template>

<style scoped>
    header {
        background-color: darkblue;
        padding-left: 1em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    h1 {
        margin: 0;
        color: white;
    }
    .header-main {
        display: flex;
        flex-direction: column;
        padding-bottom: .5em;
    }
    .button-panel {
        margin-right: 2em;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1em;
        height: auto;
    }
</style>