import { axios } from 'spack'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProjectI } from 'types'

export const useProjectDetail = defineStore('project-detail', () => {
  const fetching = ref<boolean>(false),
    data = ref<Partial<ProjectI>>({})

  async function fetch(id: number | string | undefined) {
    fetching.value = true

    const { data: responseData } = await axios.get<ProjectI>(`projects/${id}`)

    fetching.value = false
    data.value = responseData
  }

  return {
    fetch,
    fetching,
    data,
  }
})
