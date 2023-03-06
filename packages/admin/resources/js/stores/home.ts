import { axios } from 'spack'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChartTasksWeekly, ChartTasksYearly } from 'types'

interface Metrics {
  completed_tasks: number
  open_tasks: number
  total_projects: number
}

interface Charts {
  chart_tasks_yearly: ChartTasksYearly
  chart_tasks_weekly: ChartTasksWeekly
}

export const useHomeStore = defineStore('home', () => {
  const fetching = ref<boolean>(true),
    metrics = ref<Metrics>(),
    charts = ref<Charts>()

  init()

  async function init() {
    // const [ metricsResponse, chartsResponse ] = await Promise.allSettled([
    //   fetchMetrics(), fetchCharts()
    // ])

    const [metricsResponse, chartsResponse] = await Promise.all([
      fetchMetrics(),
      fetchCharts(),
    ])

    fetching.value = false

    metrics.value = metricsResponse.data
    charts.value = chartsResponse.data
  }

  function fetchMetrics() {
    return axios.get<Metrics>('metrics')
  }

  function fetchCharts() {
    return axios.get<Charts>('charts')
  }

  return {
    charts,
    fetching,
    metrics,
  }
})
