<template>
    <header>
        <div class="header-main">
            <h1>F1 Season Simulator</h1>
            <div class="button-panel">
                <outside-link-button label="Donate" link="https://github.com/sponsors/ShookTea" icon="bi-heart-fill" background-color="lightblue" text-color="black" icon-color="deeppink"/>
                <outside-link-button label="GitHub" link="https://github.com/ShookTea/F1StandingsSimulator" icon="bi-github" background-color="#303030" text-color="white" icon-color="white"/>
            </div>
        </div>
        <div class="header-control-block">
            <season-selector v-for="(sport, index) in dataToDisplay"
                             :key="index"
                             :enabled="option === index"
                             :sport-data="sport"
                             @enable="option = index"/>
        </div>
    </header>
</template>

<script lang="ts">
import SeasonSelector from '@/components/header/SeasonSelector.vue';
import allData, { SportData } from '@/data/sim/data';
import OutsideLinkButton from '@/components/header/OutsideLinkButton.vue';

export default {
    components: { OutsideLinkButton, SeasonSelector },
    data() {
        return {
            allData,
            option: 0,
        }
    },
    computed: {
        dataToDisplay(): SportData<any>[] {
            return this.allData.filter(d => d.showInMenu);
        }
    },
    methods: {
        sponsorButton(): void {
            window.location.href = 'https://github.com/sponsors/ShookTea';
        },
        githubButton(): void {
            window.location.href = 'https://github.com/ShookTea/F1StandingsSimulator';
        }
    },
    watch: {
        $route() {
            this.option = allData.findIndex(d => d.routePart === this.$route.meta.sport);
        }
    },
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
    .header-main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .button-panel {
        margin-right: 2em;
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
    .button {
        border-radius: 2em;
        border: 1px solid black;
        padding: 0 1em;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .3em;
        cursor: pointer;
    }
    .sponsor-button {
        background-color: lightblue;
    }
    .sponsor-button .icon {
        color: deeppink;
    }
    .github-button {
        background-color: #303030;
        color: white;
    }
</style>