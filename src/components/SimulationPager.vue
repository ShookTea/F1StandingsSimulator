<script setup>
import SimulationPagerButton from '@/components/SimulationPagerButton.vue';

defineProps({
    page: {
        type: Number,
        required: true,
    },
    maxPages: {
        type: Number,
        required: true,
    }
})

defineEmits(['previous', 'next', 'first', 'last'])

</script>
<template>
    <div id="simulation-pager">
        <simulation-pager-button :enabled="page > 0"
                                 @step="$emit('previous')" @max="$emit('first')"
                                 step-label="&lt;" max-label="&lt;&lt;"/>
        <div id="current-page">
            {{ page + 1 }}
        </div>
        <simulation-pager-button :enabled="page < maxPages - 1"
                                 @step="$emit('next')" @max="$emit('last')"
                                 step-label="&gt;" max-label="&gt;&gt;"/>
    </div>
</template>