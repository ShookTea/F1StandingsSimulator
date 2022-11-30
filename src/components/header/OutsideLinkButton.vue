<script lang="ts" setup>
interface Props {
    label: string
    icon: string
    backgroundColor: string
    textColor: string
    iconColor: string
    link: string
}

defineProps<Props>();
</script>

<template>
    <div class="button" @click="openLink" :style="{ backgroundColor }">
        <v-icon class="icon" :name="icon" :color="iconColor"/>
        <span :style="{ color: textColor }">{{ label }}</span>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        openLink(): void {
            window.location.href = this.link;
        }
    }
};
</script>

<style>

</style>