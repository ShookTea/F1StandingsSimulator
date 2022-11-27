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
            {{ displayPosition }}
        </div>
    </td>
</template>

<script lang="ts">
export default {
    computed: {
        displayPosition(): string {
            if (this.displayClass === 'out') {
                return '';
            }
            switch (this.type) {
                case 'best': return this.standing.maxPosition;
                case 'current': return this.standing.position;
                case 'worst': return this.standing.minPosition;
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
            if (this.standing.maxPosition === this.standing.position) {
                return 'out';
            }
            return 'max';
        },
        displayClassForCurrentPosition(): string {
            if (this.standing.maxPosition === this.standing.position && this.standing.minPosition === this.standing.position) {
                return 'solved';
            }
            if (this.standing.maxPosition === this.standing.position) {
                return 'max-current';
            }
            if (this.standing.minPosition === this.standing.position) {
                return 'min-current';
            }
            return 'in-current';
        },
        displayClassForWorstPosition(): string {
            if (this.standing.minPosition === this.standing.position) {
                return 'out';
            }
            return 'min';
        }
    }
}
</script>

<style scoped>
td {
    border: 1px solid #606060;
    border-collapse: collapse;
    text-align: center;
    height: 2em;
    width: 4em;
    padding: 0;
}
.solved {
    background-color: goldenrod;
    border-radius: 25%;
}
.max, .max-current {
    background-color: lightgreen;
    border-bottom-left-radius: 25%;
    border-top-left-radius: 25%;
}
.min, .min-current {
    background-color: lightgreen;
    border-bottom-right-radius: 25%;
    border-top-right-radius: 25%;
}
.in-current {
    background-color: lightgreen;
}
.min-current .cell-interior, .max-current .cell-interior, .in-current .cell-interior {
    background-color: darkgreen;
    border-radius: 25%;
    width: 100%;
    height: 100%;
    color: white;
}
</style>