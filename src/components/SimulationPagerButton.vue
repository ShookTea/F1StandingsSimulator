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
                <a class="button" href="#" @click="$emit('step')">{{ stepLabel }}</a>
            </div>
            <div class="max-change">
                <a class="button" href="#" @click="$emit('max')">{{ maxLabel }}</a>
            </div>
        </div>
        <div v-else class="pager-disabled">
            <div class="step-change">
                <span class="button">{{ stepLabel }}</span>
            </div>
            <div class="max-change">
                <span class="button">{{ maxLabel }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .pager-control {
        display: flex;
        flex-direction: row;
    }

    .button {
        display: block;
        text-decoration: none;
        border: 0;
        padding: 0 2em;
        text-align: center;
    }

    .pager-enabled .button {
        background-color: white;
    }

    .step-change .button {
        font-size: 1.5em;
    }

    .max-change .button {
        font-size: .6em;
        margin-top: .5em;
    }
</style>
