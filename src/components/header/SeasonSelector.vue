<script lang="ts" setup>

import { SportData } from '@/data/sim/data';

interface Props {
    sportData: SportData<any>
    enabled: boolean
}

defineProps<Props>();
defineEmits<{
    (e: 'enable'): void
}>();
</script>
<template>
    <div class="season-selector-container">
        <div class="mode-switch" v-if="!enabled" @click="() => switchToMode()">{{ sportData.label }}</div>
        <div class="season-switch" v-else>
            <label for="season-selector" class="mode-label">{{ sportData.label }}</label>
            <select id="season-selector" v-model="selectedOption">
                <option v-for="(option, index) in availableOptions" :key="index" :value="index">{{ option }}</option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">

import { SportData } from '@/data/sim/data';

export default {
    data() {
        return {
            selectedOption: 0,
        }
    },
    computed: {
        availableOptions(): string[] {
            return this.sportData.data.map(entry => entry.label);
        },
    },
    watch: {
        selectedOption(newValue: number) {
            this.goToIndex(newValue);
        },
    },
    methods: {
        switchToMode(): void {
            this.selectedOption = 0;
            this.$emit('enable');
            this.goToIndex(0);
        },
        goToIndex(index: number): void {
            const selectedEntry: SportData<any> = this.sportData.data[index];
            const path: String = `/${this.sportData.routePart}/${selectedEntry.routePart}`;
            console.log({path});
            // this.$router.push(path);
        },
    }
}
</script>