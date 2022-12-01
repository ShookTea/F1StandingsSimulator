<script lang="ts" setup>
import { useWindowWidth } from '@/composable/windowWidth';
import { Standing, Team } from '@/data/sim/f1/simDataTypes';
import FormulaLargeTableCell from '@/components/formula/FormulaLargeTableCell.vue';
import FormulaSmallTableCell from '@/components/formula/FormulaSmallTableCell.vue';

interface Props {
    index: number
    standingsCount: number
    standing: Standing<Team>
}

defineProps<Props>();
const { windowWidth } = useWindowWidth();
</script>

<template>
    <tr>
        <th class="pre-cell">
            <div class="team-name">
                <div class="team-color" :style="backgroundColor"></div>
                <div>
                    <abbr :title="standing.owner.entry">{{ constructorName }}</abbr>
                </div>
                <div v-if="standing.note !== ''" class="icon-container" :title="standing.note"><v-icon class="icon" name="bi-info-circle-fill"/></div>
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
                backgroundColor: this.standing.owner.color
            };
        },
        constructorName(): string {
            const { chassisConstructor , powerUnitConstructor } = this.standing.owner;

            if (chassisConstructor === powerUnitConstructor) {
                return chassisConstructor;
            }

            return `${chassisConstructor}-${powerUnitConstructor}`;
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
.team-name {
    display: flex;
    flex-direction: row;
    justify-content: left;
    min-width: 20em;
}
.team-name .team-color {
    min-width: 5px;
    margin-left: 2px;
}
.team-name abbr {
    text-decoration: underline;
    text-decoration-style: dotted;
    cursor: pointer;
    padding-left: 1em;
}
.icon-container {
    margin-left: 1em;
}
</style>