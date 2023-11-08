<script lang="ts" setup>
const { full, loading } = defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div min-h-full>
    <div v-if="full" v-bind="$attrs">
      <slot />
    </div>
    <CommonLoading :loading="loading" />
    <div v-if="!loading" class="grid grid-cols-12 mx-auto p-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
      <!-- Left sidebar -->
      <div class="hidden md:block xs-col-span-1 xl:col-span-2">
        <div min-h-100vh h-full>
          <!-- <SidebarLeft :user="user" @on-tweet="handleOpenTweetModal" @on-logout="handleUserLogout" /> -->
          <slot name="pre" />
        </div>
      </div>

      <!-- Main content -->
      <main class="spring col-span-12 md:col-span-7 xl:col-span-7 max-w-50em" v-bind="$attrs">
        <slot />
      </main>

      <!-- Right Sidebar -->
      <div class="hidden col-span-12 md:block xl:col-span-3 md:col-span-3">
        <div class="sticky top-20">
          <!-- <SidebarRight /> -->
          <slot name="sidebar" />
        </div>
      </div>
    </div>
    <!-- <div v-if="!full && !loading" v-spring v-bind="$attrs" flex justify-center>
      <div hidden xl:display-block>
        <slot name="pre" />
      </div>
      <div p-4 max-w-750px min-w-0 sm:max-w-850px flex-1 class="layout-post">
        <slot />
      </div>
      <div hidden md:display-block>
        <slot name="sidebar" />
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.layout-post{
  background-color: rgba(255,255,255,0.5);
}
.dark .layout-post{
  background-color: rgba(0,0,0,0.5);

}
</style>
