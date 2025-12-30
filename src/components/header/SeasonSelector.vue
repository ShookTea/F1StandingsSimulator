<script lang="ts" setup>
import { GroupData, SportData } from '@/data/sim/data';
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Props {
    sportData: SportData<any>
    enabled: boolean
}
const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'enable'): void
}>();

const selectedOption = ref<number>(0);
const route = useRoute();
const router = useRouter();


const availableOptions = computed<string[]>(
    () => props.sportData.data.map((entry) => entry.label),
);

const goToIndex = (index: number) => {
    const selectedEntry: GroupData<any> = props.sportData.data[index];
    const path: string = `/${props.sportData.routePart}/${selectedEntry.routePart}`;
    router.push(path);
}

const switchToMode = () => {
    selectedOption.value = 0;
    emit('enable');
    goToIndex(0);
}

watch(
    selectedOption,
    (newValue: number) => {
        goToIndex(newValue);
    }
);

watch(
    route,
    () => {
        if (!props.enabled) return;
        const routeKeys = props.sportData.data.map(entry => entry.routePart);
        const index = routeKeys.findIndex(k => k === route.meta.season);
        if (index !== -1) {
            selectedOption.value = index;
        }
    }
);
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

<style scoped>
.season-selector-container {
    margin-bottom: 0;
}

.mode-switch {
    font-weight: lighter;
    background-color: #0000f0;
    cursor: pointer;
    padding: .2em 1em;
    color: white;
}

.season-switch {
    font-weight: bold;
    vertical-align: baseline;
    margin-right: 1em;
    margin-left: 1em;
}

.season-switch label {
    margin-right: .1em;
    color: white;
}
</style>