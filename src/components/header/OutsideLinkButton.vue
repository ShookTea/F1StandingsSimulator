<script lang="ts" setup>
interface Props {
    label: string
    icon: string
    backgroundColor: string
    textColor: string
    iconColor: string
    link: string
}

const props = defineProps<Props>();

const openLink = () => {
    window.location.href = props.link;
}
</script>

<template>
    <div class="button" @click="openLink" :style="{ backgroundColor }">
        <v-icon class="icon" :name="icon" :color="iconColor"/>
        <span :style="{ color: textColor }">{{ label }}</span>
    </div>
</template>

<style scoped>
    .button {
        border-radius: 2em;
        border: 1px solid black;
        padding: 0 1em;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .3em;
        cursor: pointer;
        height: 3em;
    }
</style>