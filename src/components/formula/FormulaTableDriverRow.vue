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

type HeadToHeadCellState = 'no-cell' | 'empty-cell' | 'icon' | 'icon-rowspan';
// If 0, don't show cell
const headToHeadCellState = computed<HeadToHeadCellState>(() => {
    if (props.headToHeads.length === 0) {
        // No head-to-head situations present - don't show
        return 'no-cell';
    }
    if (!headToHead.value) {
        // There is a head-to-head situation, but we're not involved - add empty cell
        return 'empty-cell';
    }

    if (headToHead.value.drivers.length === 2) {
        // in case of 2-way situation, show icon with rowspan on first row and don't add cell on second row
        return headToHeadFirst.value ? 'icon-rowspan' : 'no-cell';
    }

    // in case of 3-way situation, show empty cell for first and last row and cell with icon on middle row
    if (!headToHeadFirst.value && !headToHeadLast.value) {
        return 'icon';
    }

    return 'empty-cell';
});
</script>

<template>
    <tr :class="[
        headToHead ? 'head-to-head' : null,
        headToHeadFirst ? 'head-to-head-first' : null,
        headToHeadLast ? 'head-to-head-last' : null,
        ]"
    >
        <th
            v-if="headToHeadCellState !== 'no-cell'"
            :rowspan="headToHeadCellState === 'icon-rowspan' ? 2 : 1"
            class="head-to-head-action"
            :class="headToHeadCellState === 'icon-rowspan' ? 'rowspan-2' : null"
            title="Click to show detailed detailed simulation"
        >
            <v-icon v-if="headToHeadCellState === 'icon' || headToHeadCellState === 'icon-rowspan'" name="ri-sword-line" color="red" />
        </th>
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
    --head-to-head-color: #ccffff;
    background-color: var(--head-to-head-color);
}
tr.head-to-head.head-to-head-first {
    background: linear-gradient(to bottom, transparent, var(--head-to-head-color), var(--head-to-head-color));
}
tr.head-to-head.head-to-head-last {
    background: linear-gradient(to top, transparent, var(--head-to-head-color), var(--head-to-head-color));
}
th {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
    width: 3.5em;
    position: relative;
}
th.head-to-head-action {
    border-bottom-style: none;
    border-top-style: none;
    border-left-style: none;
    border: none !important;
    border-style: none !important;
    cursor: pointer;
}
th.head-to-head-action.rowspan-2 {
    background: linear-gradient(to bottom, transparent, var(--head-to-head-color), var(--head-to-head-color), transparent);
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
