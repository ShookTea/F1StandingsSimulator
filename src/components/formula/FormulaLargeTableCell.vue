<script lang="ts" setup>
import { Standing } from '@/data/sim/f1/simDataTypes';

interface Props {
    position: number
    standing: Standing
}

defineProps<Props>();
</script>
<template>
    <td :class="positionClass">
        <div class="cell-interior"/>
    </td>
</template>

<script lang="ts">
export default {
    computed: {
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
    height: 2em;
    width: 3em;
    padding: 0;
}
.solved {
    background-color: goldenrod;
    border-radius: 25%;
}
.min, .min-current {
    background-color: lightgreen;
    border-bottom-right-radius: 25%;
    border-top-right-radius: 25%;
}
.max, .max-current {
    background-color: lightgreen;
    border-bottom-left-radius: 25%;
    border-top-left-radius: 25%;
}
.in, .in-current {
    background-color: lightgreen;
}
.min-current .cell-interior, .max-current .cell-interior, .in-current .cell-interior {
    background-color: darkgreen;
    border-radius: 25%;
    width: 100%;
    height: 100%;
}
</style>