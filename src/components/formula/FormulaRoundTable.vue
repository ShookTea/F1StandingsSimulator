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
            <formula-table-header :standings="driverStandings"/>
            <tbody>
                <formula-table-row v-for="(entry, index) in driverStandings" :key="index" :index="index" :standingsCount="driverStandings.length" :standing="entry"/>
            </tbody>
        </table>
        {{ round.teamStandings }}
    </div>
</template>

<script lang="ts">
import { Driver, Standing } from '@/data/sim/f1/simDataTypes';

export default {
    computed: {
        driverStandings(): Standing<Driver>[] {
            return this.round.driverStandings
                .filter(entry => !entry.owner.temporary || Object.keys(entry.racePositions).length > 0)
                .sort((a, b) => a.position - b.position);
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