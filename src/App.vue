<script setup>
import SimulationView from '@/components/SimulationView.vue';
</script>

<template>
  <main>
      <header>
          <h1>F1 season simulator</h1>
      </header>
      <simulation-view/>
  </main>
</template>

<style>
body {
    line-height: 1.6;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                 Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
    background-color: white;
    color: black;
}
</style>