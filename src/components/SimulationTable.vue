<script setup lang="ts">
interface Props {
    data: Round
}
defineProps<Props>()
</script>
<template>
    <div class="simulation-table">
        <table>
            <thead>
                <tr>
                    <th rowspan="2">Pos</th>
                    <th rowspan="2">Driver</th>
                    <th rowspan="2">Points</th>
                    <th :colspan="filteredData.length">Possible positions at the end of season</th>
                </tr>
                <tr>
                    <th v-for="index in positionsCount" :key="index">{{ index }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in filteredData">
                    <td class="pre-cell">{{ entry.position }}</td>
                    <td class="pre-cell">{{ entry.driver }}</td>
                    <td class="pre-cell">{{ entry.points }}</td>
                    <td v-for="index in positionsCount" :key="index" class="cell" :class="classForPosition(entry, index)"><div class="cell-interior"></div></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
export default {
    computed: {
        filteredData(): Standing[] {
            return this.data.standings.filter(entry => !entry.temporary || Object.keys(entry.racePositions).length > 0);
        },
        positionsCount(): number {
            return this.filteredData.length;
        },
    },
    methods: {
        classForPosition(entry: Standing, displayPosition: number): string {
            const positionSolved: boolean = entry.minPosition === entry.maxPosition;
            const displayInMargin: boolean = displayPosition <= entry.minPosition && displayPosition >= entry.maxPosition;
            const displayCurrent: boolean = displayPosition === entry.position;

            if (positionSolved && displayCurrent) {
                return 'solved';
            }
            if (displayInMargin && displayPosition === entry.minPosition) {
                return displayCurrent ? 'min-current' : 'min';
            }
            if (displayInMargin && displayPosition === entry.maxPosition) {
                return displayCurrent ? 'max-current' : 'max';
            }
            if (displayInMargin) {
                return displayCurrent ? 'in-current' : 'in';
            }
            return 'out';
        }
    }
}
</script>

<style scoped>
    table, td, th {
        border: 1px solid #606060;
        border-collapse: collapse;
        text-align: center;
    }

    .pre-cell {
        width: 3.5em;
    }
    .cell {
        height: 2em;
        width: 3em;
        padding: 0;
    }
    .solved {
        background-color: goldenrod;
        border-radius: 25%;
    }
    .min, .min-current {
        background-color: lightgreen;
        border-bottom-right-radius: 25%;
        border-top-right-radius: 25%;
    }
    .max, .max-current {
        background-color: lightgreen;
        border-bottom-left-radius: 25%;
        border-top-left-radius: 25%;
    }
    .in, .in-current {
        background-color: lightgreen;
    }
    .min-current .cell-interior, .max-current .cell-interior, .in-current .cell-interior {
        background-color: darkgreen;
        border-radius: 25%;
        width: 100%;
        height: 100%;
    }
</style>