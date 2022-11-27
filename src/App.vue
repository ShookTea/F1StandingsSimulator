<script lang="ts" setup>
import AppHeader from '@/components/header/AppHeader.vue';
</script>

<template>
  <main>
      <app-header/>
      <router-view/>
  </main>
</template>

<style>
html, body, main {
    line-height: 1.6;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
                 Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
    background-color: white;
    padding: 0;
    margin: 0;
    color: black;
}
</style>