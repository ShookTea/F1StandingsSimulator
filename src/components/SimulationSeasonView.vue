<script setup>
import SimulationPager from '@/components/SimulationPager.vue';

defineProps({
    seasonData: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="simulation-season-view">
        <simulation-pager :page="page" :max-pages="seasonData.length"
                          @previous="page--" @next="page++"
                          @first="page = 0" @last="page = data.length - 1"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 0
        }
    }
}
</script>