<script setup>
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
</script>
<template>
    <div class="pager-step-view">
        <div class="step-label">Step</div>
        <div class="step-content">
            <span class="current-page">{{ page + 1 }}</span>
            <span class="max-page">/ {{ maxPages }}</span>
        </div>
    </div>
</template>

<style scoped>
.pager-step-view {
    width: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.step-label {
    font-weight: lighter;
    font-size: 1.1em;
}
.step-content {
    display: flex;
    flex-direction: row;
    align-items: baseline;
}
.step-content span {
    display: block;
}
.current-page {
    font-weight: bold;
    font-size: 2em;
    width: 1.4em;
    text-align: center;
}

.max-page {
    font-weight: lighter;
    font-size: .9em;
}
</style>
