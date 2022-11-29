<script lang="ts" setup>
import { Standing, StandingOwner } from '@/data/sim/f1/simDataTypes';

interface Props {
    position: number
    standing: Standing<StandingOwner>
}

defineProps<Props>();
</script>
<template>
    <td :class="positionClass">
        <div class="cell-interior">
            <div class="cell-interior-2">
                <span v-if="displayPosition">{{ position }}</span>
            </div>
        </div>
    </td>
</template>

<script lang="ts">
export default {
    computed: {
        displayPosition(): boolean
        {
            return this.position === this.standing.position
                || this.position === this.standing.maxPosition
                || this.position === this.standing.minPosition;
        },
        positionClass(): string 
        {
            const positionSolved: boolean = this.standing.minPosition === this.standing.maxPosition;
            const displayInMargin: boolean = this.position <= this.standing.minPosition && this.position >= this.standing.maxPosition;
            const displayCurrent: boolean = this.position === this.standing.position;

            if (positionSolved && displayCurrent) {
                return 'solved';
            }
            if (displayInMargin && this.position === this.standing.minPosition) {
                return displayCurrent ? 'min-current' : 'min';
            }
            if (displayInMargin && this.position === this.standing.maxPosition) {
                return displayCurrent ? 'max-current' : 'max';
            }
            if (displayInMargin) {
                return displayCurrent ? 'in-current' : 'in';
            }
            return 'out';
        }
    }
};
</script>

<style scoped>
td {
    border-bottom: 1px solid #606060;
    border-collapse: collapse;
    height: 2em;
    width: 3em;
    padding: 0;
}
.solved .cell-interior-2 {
    background-color: goldenrod;
    border: 1px solid darkgray;
    border-radius: 50%;
}
.min .cell-interior, .min-current .cell-interior {
    background-color: lightgreen;
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
}
.max .cell-interior, .max-current .cell-interior {
    background-color: lightgreen;
    border-bottom-left-radius: 50%;
    border-top-left-radius: 50%;
}
.in .cell-interior, .in-current .cell-interior {
    background-color: lightgreen;
    height: 80%;
}
.min-current .cell-interior-2, .max-current .cell-interior-2, .in-current .cell-interior-2 {
    background-color: darkgreen;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    color: white;
}
</style>