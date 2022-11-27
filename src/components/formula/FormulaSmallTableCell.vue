<script lang="ts" setup>
import { Standing } from '@/data/sim/f1/simDataTypes';

interface Props {
    standing: Standing
    type: string
}

defineProps<Props>();
</script>
<template>
    <td>{{ displayPosition }}</td>
</template>

<script lang="ts">
export default {
    computed: {
        displayPosition(): number {
            switch (this.type) {
                case 'best': return this.standing.maxPosition;
                case 'current': return this.standing.position;
                case 'worst': return this.standing.minPosition;
            }
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
</style>