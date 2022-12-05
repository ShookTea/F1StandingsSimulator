<template>
    <div>
        {{ driverData }}
    </div>
</template>

<script lang="ts">
    import allData, { GroupData } from '@/data/sim/data';
    import { Driver } from '@/data/sim/formulaDrivers/driverDataTypes';

    export default {
        computed: {
            driverData(): GroupData<Driver> {
                const sportData = allData.find(entry => entry.routePart === this.$route.meta.sport);
                return <GroupData<Driver>><unknown>sportData.data.find(entry => entry.routePart === this.$route.meta.season);
            }
        }
    };
</script>