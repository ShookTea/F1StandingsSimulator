<template>
    <header>
        <div class="header-main">
            <h1>F1 Season Simulator</h1>
            <div class="button-panel">
                <div class="button sponsor-button" @click="sponsorButton">
                    <svg height="16" width="16">
                        <path fill="red" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path>
                    </svg>
                    <span>
                        Donate
                    </span>
                </div>
            </div>
        </div>
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
            option: 0,
        }
    },
    methods: {
        sponsorButton(): void {
            window.location.href = 'https://github.com/sponsors/ShookTea';
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
</style>