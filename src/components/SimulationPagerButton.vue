<script setup>
defineProps({
    enabled: {
        type: Boolean,
        required: true
    },
    stepLabel: {
        type: String,
        required: true
    },
    maxLabel: {
        type: String,
        required: true,
    }
})
defineEmits(['step', 'max'])
</script>

<template>
    <div class="pager-control">
        <div v-if="enabled" class="pager-enabled">
            <div class="step-change">
                <a href="#" @click="$emit('step')">{{ stepLabel }}</a>
            </div>
            <div class="max-change">
                <a href="#" @click="$emit('max')">{{ maxLabel }}</a>
            </div>
        </div>
        <div v-else class="pager-disabled">
            <div class="step-change">
                <span>{{ stepLabel }}</span>
            </div>
            <div class="max-change">
                <span>{{ maxLabel }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .pager-control {
        display: flex;
        flex-direction: row;
    }
</style>
