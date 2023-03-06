<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex w-64 flex-col">
      <div class="flex h-0 flex-1 flex-col">
        <RouterLink
          to="/"
          class="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4"
        >
          <SidebarLogo />
        </RouterLink>

        <div class="sidebar-nav flex flex-1 flex-col overflow-y-auto">
          <nav class="flex-1 bg-gray-800 px-2 py-4">
            <SidebarNav />
            <SidebarFavorites />
            <SidebarProjects />
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SidebarNav from './SidebarNav.vue'
  import SidebarLogo from './SidebarLogo.vue'
  import SidebarProjects from './projects/Index.vue'
  import SidebarFavorites from './favorites/Index.vue'
</script>
