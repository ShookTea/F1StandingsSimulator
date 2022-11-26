<template>
    <header>
        <h1>F1 Season Simulator</h1>
        <div class="header-control-block">
            <div @click="selected = 0" class="header-control-block-entry" :class="selected === 0 ? 'selected' : null">
                Formula 1
            </div>
            <div @click="selected = 1" class="header-control-block-entry" :class="selected === 1 ? 'selected' : null">
                Formula 2
            </div>
        </div>
    </header>
</template>

<script lang="ts">
export default {
    data() {
        return {
            selected: 0,
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
    .header-control-block-entry {
        margin-right: 1em;
    }
    .selected {
        font-weight: bold;
    }
</style>