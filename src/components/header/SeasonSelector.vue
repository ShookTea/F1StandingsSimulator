<script lang="ts" setup>
interface Option {
    text: string
    value: string
}

interface Props {
    label: string
    enabled: boolean
    availableValues: Option[]
}

defineProps<Props>();
defineEmits<{
    (e: 'enable'): void
}>();
</script>
<template>
    <div class="season-selector-container">
        <div class="mode-switch" v-if="!enabled" @click="$emit('enable')">{{ label }}</div>
        <div class="season-switch" v-else>
            <span class="mode-label">{{ label }}</span>
            <label for="season-selector">Choose season:</label>
            <select id="season-selector" @input="event => console.log({event})">
                <option v-for="option in availableValues" :value="option.value">{{ option.text }}</option>
            </select>
        </div>
    </div>
</template>
