<script lang="ts" setup>
import { useWindowWidth } from '@/composable/windowWidth';
import { Standing } from '@/data/sim/f1/simDataTypes';
import FormulaLargeTableCell from '@/components/formula/FormulaLargeTableCell.vue';
import FormulaSmallTableCell from '@/components/formula/FormulaSmallTableCell.vue';

interface Props {
    index: number
    standingsCount: number
    standing: Standing
}

defineProps<Props>();
const { windowWidth } = useWindowWidth();
</script>

<template>
    <tr>
        <th class="pre-cell">{{ standing.driver.number }}</th>
        <th class="pre-cell"><abbr class="driver-abbr" :title="fullName">{{ standing.driver.abbreviation }}</abbr></th>
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
        fullName(): string {
            const { givenName, familyName, familyNameFirst = false } = this.standing.driver.details;

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
    text-decoration: underline;
    text-decoration-style: dotted;
    cursor: pointer;
}
</style>