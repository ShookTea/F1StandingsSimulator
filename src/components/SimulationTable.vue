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
        <ul>
            <li v-for="item in filteredData">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        filteredData() {
            return this.data.result.filter(entry => !entry.temporary || Object.keys(entry.racePositions).length > 0);
        }
    }
}
</script>