<script lang="ts" setup>
import { useWindowWidth } from '@/composable/windowWidth';
import { Driver, HeadToHead, Standing } from '@/data/sim/f1/simDataTypes';
import FormulaLargeTableCell from '@/components/formula/FormulaLargeTableCell.vue';
import FormulaSmallTableCell from '@/components/formula/FormulaSmallTableCell.vue';
import { computed } from 'vue';

interface Props {
    index: number
    standingsCount: number
    standing: Standing<Driver>
    pointDiff: number
    headToHeads: HeadToHead[]
}

const props = defineProps<Props>();
const { windowWidth } = useWindowWidth();

const fullName = computed<string>(() => {
    const { givenName, familyName, familyNameFirst = false } = props.standing.owner.details;
    if (familyNameFirst) {
        return `${familyName} ${givenName}`;
    }
    return `${givenName} ${familyName}`;
});

const getHeadToHeadIndex = (headToHead: HeadToHead) => {
    const minPosition = headToHead.leadPosition;
    const totalDriversInSituation = headToHead.drivers.length;
    const maxPosition = headToHead.leadPosition + totalDriversInSituation - 1;
    return { minPosition, maxPosition };
}

const headToHead = computed<HeadToHead | null>(() => {
    for (const entry of props.headToHeads) {
        const { minPosition, maxPosition } = getHeadToHeadIndex(entry);
        const currentPosition = props.index + 1;
        if (currentPosition >= minPosition && currentPosition <= maxPosition) {
            return entry;
        }
    }
    return null;
});

const headToHeadFirst = computed<boolean>(() => headToHead.value && headToHead.value.leadPosition === props.index + 1);
const headToHeadLast = computed<boolean>(() => {
    if (!headToHead.value) {
        return false;
    }
    const { maxPosition } = getHeadToHeadIndex(headToHead.value);
    return maxPosition === props.index + 1;
})
</script>

<template>
    <tr :class="[
        headToHead ? 'head-to-head' : null,
        headToHeadFirst ? 'head-to-head-first' : null,
        headToHeadLast ? 'head-to-head-last' : null,
        ]"
    >
        <th class="pre-cell">{{ standing.owner.number }}</th>
        <th class="pre-cell">
            <div class="driver-abbr">
                <div class="team-color" :style="{ backgroundColor: standing.owner.team.color }"></div>
                <div>
                    <abbr :title="fullName">{{ standing.owner.abbreviation }}</abbr>
                </div>
                <div/>
            </div>
        </th>
        <th class="pre-cell">
            {{ standing.points }}
            <span class="point-diff" v-if="pointDiff !== 0">+{{ pointDiff }}</span>
        </th>
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

<style>
tr.head-to-head {
    background-color: cyan;
}
tr.head-to-head.head-to-head-first {
    background: linear-gradient(to bottom, transparent, cyan, cyan);
}
tr.head-to-head.head-to-head-last {
    background: linear-gradient(to top, transparent, cyan, cyan);
}
th {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
    width: 3.5em;
    position: relative;
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
.point-diff {
    position: absolute;
    top: 1.7em;
    left: 0;
    width: 100%;
    font-weight: lighter;
    font-size: x-small;
    color: darkgreen;
}
</style>
