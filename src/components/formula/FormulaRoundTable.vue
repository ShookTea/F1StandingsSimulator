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
            return this.round.standings
                .filter(entry => !entry.temporary || Object.keys(entry.racePositions).length > 0)
                .sort((a, b) => a.position - b.position);
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
</style>