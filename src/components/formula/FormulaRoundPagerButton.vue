<script lang="ts" setup>
interface Props {
    enabled: boolean
    stepLabel: string
    maxLabel: string
    left?: boolean
    right?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  left: false,
  right: false
});
const emit = defineEmits(['step', 'max'])

if (props.left) {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') emit('step');
  })
}
if (props.right) {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') emit('step');
  })
}
</script>

<template>
    <div class="pager-control">
        <div v-if="enabled" class="pager-enabled">
            <div class="step-change">
                <span class="button" @click="$emit('step')">{{ stepLabel }}</span>
            </div>
            <div class="max-change">
                <span class="button" @click="$emit('max')">{{ maxLabel }}</span>
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
    background-color: #e0e0e0;
    cursor: pointer;
}

.step-change .button {
    font-size: 1.5em;
}

.max-change .button {
    font-size: .6em;
    margin-top: .5em;
}
</style>
