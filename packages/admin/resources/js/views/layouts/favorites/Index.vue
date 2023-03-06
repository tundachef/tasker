<template>
  <section class="mt-8">
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
            {{ __('Favorites') }}
          </h3>
        </div>
      </template>

      <template #content>
        <div class="mt-2.5">
          <template v-for="item in favorite.items" :key="item.project.name">
            <RouterLink
              v-slot="{ navigate, href, route }"
              :to="`/projects/${item.project.id}`"
              custom
            >
              <a
                :href="href"
                :class="[
                  isActive(route.path)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center rounded-md py-2 pl-3 pr-2 text-sm font-medium',
                ]"
                @click="navigate"
              >
                <span
                  class="h-2.5 w-2.5 rounded-full ltr:ml-1 ltr:mr-4 rtl:mr-1 rtl:ml-4"
                  aria-hidden="true"
                  :style="{ 'background-color': item.project.meta.color }"
                ></span>
                <span class="flex-1 truncate">{{ item.project.name }}</span>
              </a>
            </RouterLink>
          </template>
        </div>
      </template>
    </Collapsible>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFavoriteStore } from 'Store/favorite'
  import { Collapsible } from 'thetheme'

  const router = useRouter(),
    path = computed(() => router.currentRoute.value.path),
    favorite = useFavoriteStore()

  favorite.fetch()

  function isActive(href: string) {
    return path.value.startsWith(href)
  }
</script>
