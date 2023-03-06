<template>
  <section class="mt-8">
    <!-- <div class="flex cursor-pointer items-center pl-3">
      <svg
        viewBox="0 0 16 16"
        class="h-4 w-4 text-gray-500"
        :class="{ 'rotate-[270deg]': true }"
      >
        <path
          d="M14 5.758L13.156 5 7.992 9.506l-.55-.48.002.002-4.588-4.003L2 5.77 7.992 11 14 5.758"
          fill="currentColor"
        ></path>
      </svg>

      <h3
        class="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
      >
        {{ __('Projects') }}
      </h3>

      <div class="flex items-center ml-auto">
        <span
          data-cy="projects-index-button-sidebar"
          class="mr-2 flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-700 hover:text-gray-300"
          @click.stop="project.create"
        >
          <FolderIcon class="h-4 w-4" />
        </span>

        <span
          data-cy="create-project-button-sidebar"
          class="1bg-blue-400 ml-auto mr-2 flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-700 hover:text-gray-300"
          @click.stop="project.create"
        >
          <PlusIcon class="h-4 w-4" />
        </span>
      </div>
    </div> -->

    <Collapsible open>
      <template #trigger="{ open }">
        <div class="flex cursor-pointer items-center pl-3">
          <svg
            viewBox="0 0 16 16"
            class="h-4 w-4 text-gray-500"
            :class="{ 'rotate-[270deg]': !open }"
          >
            <path
              d="M14 5.758L13.156 5 7.992 9.506l-.55-.48.002.002-4.588-4.003L2 5.77 7.992 11 14 5.758"
              fill="currentColor"
            ></path>
          </svg>

          <h3
            class="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            {{ __('Projects') }}
          </h3>

          <div class="ml-auto flex items-center">
            <!-- <RouterLink
              to="/projects"
              data-cy="projects-index-button-sidebar"
              class="mr-2 flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-700 hover:text-gray-300"
            >
              <FolderOpenIcon class="h-3.5 w-3.5" />
            </RouterLink> -->

            <RouterLink
              v-slot="{ href, navigate }"
              to="/projects"
              custom
            >
              <a
                :href="href"
                data-cy="projects-index-button-sidebar"
                class="mr-2 flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-700 hover:text-gray-300"
                @click.stop="navigate"
              >
                <FolderOpenIcon class="h-3.5 w-3.5" />
              </a>
            </RouterLink>

            <span
              v-if="can('project:create')"
              data-cy="create-project-button-sidebar"
              class="1bg-blue-400 ml-auto mr-2 flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-700 hover:text-gray-300"
              @click.stop="project.create"
            >
              <PlusIcon class="h-4 w-4" />
            </span>
          </div>
        </div>
      </template>

      <template #content>
        <div class="mt-2.5 space-y-1">
          <template v-for="(item, index) in project.items" :key="item.name">
            <RouterLink
              v-slot="{ navigate, href, route }"
              :to="`/projects/${item.id}`"
              custom
            >
              <a
                :href="href"
                :class="[
                  isActive(route.path)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                ]"
                @click="navigate"
              >
                <span
                  class="h-2.5 w-2.5 rounded-full ltr:ml-1 ltr:mr-4 rtl:mr-1 rtl:ml-4"
                  aria-hidden="true"
                  :style="{ 'background-color': item.meta.color }"
                ></span>
                <span class="flex-1 truncate">{{ item.name }}</span>

                <SidebarProjectMenu
                  :id="item.id"
                  :index="index"
                  :is-favorite="item.is_favorite"
                  class="group-hover:block"
                  :class="{ hidden: currentIndex != index }"
                  @toggle-menu="onToggle"
                />
              </a>
            </RouterLink>
          </template>
        </div>
      </template>
    </Collapsible>
  </section>
</template>

<script setup lang="ts">
  import SidebarProjectMenu from './ProjectMenu.vue'
  import { useProjectIndex } from 'Store/project'
  import { Collapsible } from 'thetheme'
  import { FolderOpenIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import { useRouter } from 'vue-router'
  import { computed, ref } from 'vue'

  const project = useProjectIndex(),
    router = useRouter(),
    path = computed(() => router.currentRoute.value.path),
    currentIndex = ref(null)

  function isActive(href: string): boolean {
    return path.value.startsWith(href)
  }

  function onToggle(data: any) {
    if (data.state) {
      currentIndex.value = data.index
    } else if (currentIndex.value == data.index) {
      currentIndex.value = null
    }
  }
</script>
