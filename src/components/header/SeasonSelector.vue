<script lang="ts" setup>
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
        $route() {
            if (!this.enabled) return;
            const routeKeys = this.sportData.data.map(entry => entry.routePart);
            const index = routeKeys.findIndex(k => k === this.$route.meta.season);

            if (index !== -1) {
                this.selectedOption = index;
            }
        }
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
            this.$router.push(path);
        },
    }
}
</script>

<style scoped>
.season-selector-container {
    margin-bottom: 0;
}

.mode-switch {
    font-weight: lighter;
    background-color: #0000f0;
    cursor: pointer;
    padding: .2em 1em;
}

.season-switch {
    font-weight: bold;
    vertical-align: baseline;
    margin-right: 1em;
    margin-left: 1em;
}

.season-switch label {
    margin-right: .1em;
}
</style>