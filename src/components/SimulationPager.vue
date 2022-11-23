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
        <div id="simulation-pager-switcher">
            <simulation-pager-button :enabled="page > 0"
                                     @step="$emit('previous')" @max="$emit('first')"
                                     step-label="&lt;" max-label="&lt;&lt;"/>
            <div id="current-page">
                {{ page + 1 }}
            </div>
            <div id="max-pages">
                / {{ maxPages }}
            </div>
            <simulation-pager-button :enabled="page < maxPages - 1"
                                     @step="$emit('next')" @max="$emit('last')"
                                     step-label="&gt;" max-label="&gt;&gt;"/>
        </div>
        <div id="current-page-description">
            Some description of current page
        </div>
    </div>
</template>

<style scoped>
    #simulation-pager {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #simulation-pager-switcher {
        display: flex;
        flex-direction: row;
        align-items: end;
        gap: 1em;
    }

    #current-page {
        font-weight: bold;
        font-size: 2em;
    }

    #max-pages {
        font-weight: lighter;
        font-size: .9em;
    }
</style>