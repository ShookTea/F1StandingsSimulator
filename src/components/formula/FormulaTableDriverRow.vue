<script lang="ts" setup>
import { useWindowWidth } from '@/composable/windowWidth';
import { Driver, Standing } from '@/data/sim/f1/simDataTypes';
import FormulaLargeTableCell from '@/components/formula/FormulaLargeTableCell.vue';
import FormulaSmallTableCell from '@/components/formula/FormulaSmallTableCell.vue';

interface Props {
    index: number
    standingsCount: number
    standing: Standing<Driver>
}

defineProps<Props>();
const { windowWidth } = useWindowWidth();
</script>

<template>
    <tr>
        <th class="pre-cell">{{ standing.owner.number }}</th>
        <th class="pre-cell">
            <div class="driver-abbr">
                <div class="team-color" :style="backgroundColor"></div>
                <div>
                    <abbr :title="fullName">{{ standing.owner.abbreviation }}</abbr>
                </div>
                <div/>
            </div>
        </th>
        <th class="pre-cell">{{ standing.points }}</th>
        <template v-if="windowWidth > 1000">
            <formula-large-table-cell v-for="index in standingsCount" :key="index" :position="index" :standing="standing"/>
        </template>
        <template v-else>
            <formula-small-table-cell :standing="standing" type="best"/>
            <formula-small-table-cell :standing="standing" type="current"/>
            <formula-small-table-cell :standing="standing" type="worst"/>
        </template>
    </tr>
</template>

<script lang="ts">

export default {
    computed: {
        backgroundColor() {
            return {
                backgroundColor: this.standing.owner.team.color
            };
        },
        fullName(): string {
            const { givenName, familyName, familyNameFirst = false } = this.standing.owner.details;

            if (familyNameFirst) {
                return `${familyName} ${givenName}`;
            }
            return `${givenName} ${familyName}`;
        }
    }
}
</script>

<style>
th {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
    width: 3.5em;
}
.driver-abbr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.driver-abbr .team-color {
    min-width: 5px;
    margin-left: 2px;
}
.driver-abbr abbr {
    text-decoration: underline;
    text-decoration-style: dotted;
    cursor: pointer;
}
</style>