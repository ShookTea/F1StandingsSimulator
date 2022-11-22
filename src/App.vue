<script setup>
import data from './data/sim/2022.data'
import SimulationPager from '@/components/SimulationPager.vue';
</script>

<template>
  <main>
      <simulation-pager :page="page" :max-pages="data.length"
                        @previous="page--" @next="page++"
                        @first="page = 0" @last="page = data.length - 1"/>
      <table>
          <thead>
            <tr>
                <th v-for="(item, index) in data[0]">
                    {{ item.driver }}
                </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in data">
                <td v-for="({points, maxPoints, position, maxPosition, minPosition}, index) in entry">
                    {{ points }} - {{ position }} ({{ maxPosition }} - {{ minPosition }})
                </td>
            </tr>
          </tbody>
      </table>
  </main>
</template>

<script>
export default {
    data() {
        return {
            data,
            page: 0,
        }
    }
}
</script>

<style scoped>
table, td, th {
    border: 1px solid black;
    border-collapse: collapse;
}

td, th {
    padding: 0 2px;
}

th {
    font-weight: bold;
}

</style>
