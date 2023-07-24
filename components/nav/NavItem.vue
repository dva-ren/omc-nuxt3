<script lang="ts" setup>
import type { NavItem } from '~/types'

const { data, active } = defineProps<{ data: NavItem; active?: boolean }>()

const emits = defineEmits(['onSelect'])
</script>

<template>
  <div text-sm h-full flex px-4 class="nav-item" :class="active ? 'active' : ''">
    <router-link v-if="!data.children" :to="data.url" flex items-center @click="emits('onSelect')">
      <div :class="data.icon" inline-block />
      <span p-l-2>{{ data.name }}</span>
    </router-link>
    <CommonPopper v-else trigger="hover" flex h-full>
      <router-link :to="data.url" flex items-center w-full @click="emits('onSelect')">
        <div :class="data.icon" inline-block />
        <span p-l-2>{{ data.name }}</span>
      </router-link>
      <template #content>
        <div v-for="child in data.children" :key="child.name" text-sm p-1>
          <router-link v-if="child.icon" :to="child.url" min-w-20 rounded text-center block hover:bg-gray-200 py-2 transition flex items-center gap-2 justify-center>
            <div :class="child.icon" />
            <div>{{ child.name }}</div>
          </router-link>
          <router-link v-else :to="child.url" min-w-22 text-center rounded py-2 block hover:bg-gray-200 transition>
            {{ child.name }}
          </router-link>
        </div>
      </template>
    </CommonPopper>
  </div>
</template>

<style scoped>
.nav-item{

}
.active{

}
</style>
