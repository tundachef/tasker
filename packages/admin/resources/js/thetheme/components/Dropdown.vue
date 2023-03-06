<template>
  <div ref="target" class="relative">
    <div @click.prevent="trigger">
      <slot name="trigger" />
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div ref="content">
        <slot v-if="isOpen" name="content" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { onUpdated, ref, watch } from 'vue'

  const props = defineProps<{
    // modal: Boolean,
    // name: String,
    close?: boolean,
    closeOutside?: boolean
  }>()

  onUpdated(() => {
    if (props.close) close()
  })

  const isOpen = ref(false)
  const target = ref(null)
  const content = ref(null)
  const emit = defineEmits(['toggle'])

  function trigger() {
    isOpen.value = !isOpen.value
  }

  watch(isOpen, (current) => {
    emit('toggle', current)

    if (current) {
      // document.addEventListener('click', closeOnClick)
      // document.addEventListener('click', closeIfClickedOutside)
      window.addEventListener(
        'click',
        props.closeOutside ? closeIfClickedOutside : closeOnClick,
        { capture: true },
      )
    } else {
      // document.removeEventListener('click', closeOnClick)
      // document.removeEventListener('click', closeIfClickedOutside)
      window.removeEventListener(
        'click',
        props.closeOutside ? closeIfClickedOutside : closeOnClick,
        { capture: true },
      )
    }
  })

  function close() {
    isOpen.value = false
  }

  function closeIfClickedOutside(event: Event) {
    const el = target.value

    if (!el || el === event.target || event.composedPath().includes(el)) return

    close()
  }

  function closeOnClick(event: Event) {
    const elTarget = target.value
    const elContent = content.value

    if (
      !elContent ||
      elContent === event.target ||
      event.composedPath().includes(elContent)
    ) {
      close()
    }

    if (
      !elTarget ||
      elTarget === event.target ||
      event.composedPath().includes(elTarget)
    )
      return

    close()
  }
</script>
