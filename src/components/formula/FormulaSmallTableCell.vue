<script lang="ts" setup>
import { Standing } from '@/data/sim/f1/simDataTypes';

interface Props {
    standing: Standing
    type: string
}

defineProps<Props>();
</script>
<template>
    <td :class="displayClass">
        <div class="cell-interior">
            <div class="cell-interior-2">
                {{ displayPosition }}
            </div>
        </div>
    </td>
</template>

<script lang="ts">
export default {
    computed: {
        isSolved(): boolean {
            return this.standing.position === this.standing.maxPosition && this.standing.position === this.standing.minPosition;
        },
        isCurrentPositionOnSide(): boolean {
            if (this.isSolved) return false;
            return this.standing.position === this.standing.maxPosition || this.standing.position === this.standing.minPosition;
        },
        displayPosition(): string {
            switch (this.type) {
                case 'best': return this.isSolved ? '' : this.standing.maxPosition;
                case 'current': return this.isCurrentPositionOnSide ? '' : this.standing.position;
                case 'worst': return this.isSolved ? '' : this.standing.minPosition;
            }
        },
        displayClass(): string {
            switch (this.type) {
                case 'best': return this.displayClassForBestPosition;
                case 'current': return this.displayClassForCurrentPosition;
                case 'worst': return this.displayClassForWorstPosition;
            }
        },
        displayClassForBestPosition(): string {
            if (this.isSolved) {
                return 'out';
            }
            if (this.standing.maxPosition === this.standing.position) {
                return 'max-current';
            }
            return 'max';
        },
        displayClassForCurrentPosition(): string {
            if (this.isSolved) {
                return 'solved';
            }
            if (this.isCurrentPositionOnSide) {
                return 'in';
            }
            return 'in-current';
        },
        displayClassForWorstPosition(): string {
            if (this.isSolved) {
                return 'out';
            }
            if (this.standing.minPosition === this.standing.position) {
                return 'min-current';
            }
            return 'min';
        }
    }
}
</script>

<style scoped>
td {
    border-bottom: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
    height: 2em;
    width: 4em;
    padding: 0;
}
.solved .cell-interior {
    background-color: goldenrod;
    border-radius: 50%;
    border: 1px solid darkgray;
}
.max .cell-interior, .max-current .cell-interior {
    background-color: lightgreen;
    border-bottom-left-radius: 50%;
    border-top-left-radius: 50%;
}
.min .cell-interior, .min-current .cell-interior {
    background-color: lightgreen;
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
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
    border: 1px solid darkgray;
}
</style>