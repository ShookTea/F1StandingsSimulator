<script setup>
import SimulationPager from '@/components/SimulationPager.vue';
import SimulationTable from '@/components/SimulationTable.vue';

defineProps({
    seasonData: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <div class="simulation-season-view">
        <simulation-pager :page="page" :max-pages="seasonData.length"
                          @previous="page--" @next="page++"
                          @first="page = 0" @last="page = seasonData.length - 1"
                          :label="seasonData[page].roundName"/>
        <simulation-table :data="seasonData[page]"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: this.seasonData.length - 1,
        }
    },
    watch: {
        seasonData() {
            this.page = this.seasonData.length - 1;
        }
    }
}
</script>