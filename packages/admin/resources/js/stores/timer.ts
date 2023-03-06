import { appData } from '@/app-data'
import { defineStore } from 'pinia'
import { axios } from 'spack'
import type { TaskI } from 'types'

let timerInterval: NodeJS.Timer

export const useTimerStore = defineStore('timer', {
  state: (): {
    taskId: number | null
    projectId: number | null
    projectName: string | null
    taskTitle: string | null
    processing: boolean
    timers: any
    isTimerRunning: boolean
    timerStartedAt: Date | null
    timerStoppedAt: Date | null
    currentTaskTimer: any
  } => ({
    taskId: null,
    projectId: null,
    projectName: null,
    taskTitle: null,
    processing: false,
    timers: [],
    isTimerRunning: false,
    timerStartedAt: null,
    timerStoppedAt: null,
    currentTaskTimer: {
      h: 0,
      m: 0,
      s: 0,
    },
  }),

  actions: {
    start(task: TaskI) {
      this.stopPrev()

      this.startTimer()
      this.taskId = task.id
      this.taskTitle = task.title
      this.projectId = task.project_id
      this.projectName = task.project.name
      this.processing = true

      axios
        .post('time-logs', {
          taskId: this.taskId,
          projectId: this.projectId,
          start: true,
          currentTime: this.timerStartedAt,
        })
        .then(() => {
          this.processing = false
          this.fetch()
        })
        .catch(() => {
          this.processing = false
        })
    },

    stop() {
      this.stopTimer()

      const taskId = this.taskId
      const projectId = this.projectId
      this.processing = true

      axios
        .post('time-logs', {
          taskId: taskId,
          projectId: projectId,
          stop: true,
          currentTime: this.timerStoppedAt,
        })
        .then(() => {
          this.processing = false
          this.fetch()
        })
        .catch(() => {
          this.processing = false
        })

      this.taskId = null
      this.projectId = null
      this.projectName = null
    },

    stopPrev() {
      if (!this.taskId) return

      console.log('stopPrev')
      this.stopTimer()

      const taskId = this.taskId
      const projectId = this.projectId
      this.processing = true

      axios
        .post('time-logs', {
          taskId: taskId,
          projectId: projectId,
          stop: true,
          currentTime: this.timerStoppedAt,
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(() => {
          console.log('error')
          this.processing = false
        })
    },

    fetch() {
      axios.get<any>('time-logs').then((response) => {
        this.timers = response.data

        const task = response.data.find(
          (x: any) => x.user.id == appData.user.id,
        )

        if (task) {
          this.taskId = task.task.id
          this.taskTitle = task.task.title
          this.projectId = task.task.project_id
          this.projectName = task.task.project.name
        }
      })
    },

    startTimer() {
      timerInterval = setInterval(() => {
        if (this.currentTaskTimer.s == 59) {
          this.currentTaskTimer.s = 0
          this.currentTaskTimer.m++
        } else if (this.currentTaskTimer.m == 59) {
          this.currentTaskTimer.m = 0
          this.currentTaskTimer.h++
        } else {
          this.currentTaskTimer.s++
        }
      }, 1000)

      this.timerStartedAt = new Date()
      this.isTimerRunning = true
    },

    stopTimer() {
      clearInterval(timerInterval)

      this.timerStoppedAt = new Date()
      this.isTimerRunning = false
    },

    setTimer(seconds: number) {
      // this.isTimerRunning = false

      this.currentTaskTimer.s = Math.floor(seconds % 60)
      this.currentTaskTimer.m = Math.floor((seconds % 3600) / 60)
      // this.currentTaskTimer.h = Math.floor((seconds % (3600 * 24)) / 3600)
      this.currentTaskTimer.h = Math.floor(seconds / 3600)
    },
  },
})
