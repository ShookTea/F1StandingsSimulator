<script lang="ts" setup>
import { SeasonData } from '@/data/sim/data';
import { Season } from '@/data/sim/f1/simDataTypes';

interface Props {
    seasonData: SeasonData<Season>
}
defineProps<Props>()
</script>

<template>
    <div class="simulation-season-view">
        {{ seasonData }}
    </div>
</template>
