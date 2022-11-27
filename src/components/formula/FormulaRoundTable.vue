<script setup lang="ts">
import { Round } from '@/data/sim/f1/simDataTypes';
import FormulaTableHeader from '@/components/formula/FormulaTableHeader.vue';
import FormulaTableRow from '@/components/formula/FormulaTableRow.vue';

interface Props {
    round: Round
}
defineProps<Props>()
</script>
<template>
    <div class="simulation-table">
        <table>
            <formula-table-header :standings="filteredStandings"/>
            <tbody>
                <formula-table-row v-for="(entry, index) in filteredStandings" :key="index" :index="index" :standingsCount="filteredStandings.length" :standing="entry"/>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Standing } from '@/data/sim/f1/simDataTypes';

export default {
    computed: {
        filteredStandings(): Standing[] {
            return this.round.standings.filter(entry => !entry.temporary || Object.keys(entry.racePositions).length > 0);
        },
        positionsCount(): number {
            return this.filteredStandings.length;
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