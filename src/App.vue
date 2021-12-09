<template>
  <modals-container />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>