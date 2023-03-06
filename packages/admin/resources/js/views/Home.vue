<template>
  <Loader v-if="home.fetching" size="40" color="#5850ec" class="mx-auto mt-8" />

  <div v-else>
    <h1 class="mb-5 text-2xl font-semibold text-gray-900">
      {{ __('Dashboard') }}
    </h1>

    <Metrics />

    <Charts />
  </div>
</template>

<script setup lang="ts">
  import { useHomeStore } from 'Store/home'
  import { Loader } from 'thetheme'
  import Charts from './_Charts.vue'
  import Metrics from './_Metrics.vue'

  const home = useHomeStore()
</script>
