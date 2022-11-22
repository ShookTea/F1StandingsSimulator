<script setup>
import data from './data/sim/2022.data'

</script>

<template>
  <main>
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
