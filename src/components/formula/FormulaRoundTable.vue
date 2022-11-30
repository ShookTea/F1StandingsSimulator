<script setup lang="ts">
import { Round } from '@/data/sim/f1/simDataTypes';
import FormulaTableHeader from '@/components/formula/FormulaTableHeader.vue';
import FormulaTableDriverRow from '@/components/formula/FormulaTableDriverRow.vue';
import FormulaTableTeamRow from '@/components/formula/FormulaTableTeamRow.vue';

interface Props {
    round: Round
}
defineProps<Props>()
</script>
<template>
    <div class="simulation-table">
        <table>
            <caption>Driver standings (Maximum of {{ round.maxRemainingDriverPoints }} more points to collect)</caption>
            <formula-table-header :standings="driverStandings" name-label="Driver" show-number-column/>
            <tbody>
                <formula-table-driver-row v-for="(entry, index) in driverStandings" :key="index" :index="index" :standings-count="driverStandings.length" :standing="entry"/>
            </tbody>
        </table>
        <table>
            <caption>Team standings (Maximum of {{ round.maxRemainingTeamPoints }} more points to collect)</caption>
            <formula-table-header :standings="teamStandings" name-label="Team"/>
            <tbody>
                <formula-table-team-row v-for="(entry, index) in teamStandings" :key="index" :index="index" :standings-count="teamStandings.length" :standing="entry"/>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Driver, Standing, Team } from '@/data/sim/f1/simDataTypes';

export default {
    computed: {
        driverStandings(): Standing<Driver>[] {
            return this.round.driverStandings
                .filter(entry => !entry.owner.temporary || Object.keys(entry.racePositions).length > 0)
                .sort((a, b) => a.position - b.position);
        },
        teamStandings(): Standing<Team>[] {
            return this.round.teamStandings;
        }
    }
}
</script>

<style scoped>
.simulation-table {
    display: flex;
    flex-direction: column;
    gap: 3em;
}
table, td, th {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
}
</style>