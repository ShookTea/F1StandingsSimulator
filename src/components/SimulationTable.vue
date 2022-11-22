<script setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <div class="simulation-table">
        {{ data }}
    </div>
</template>
