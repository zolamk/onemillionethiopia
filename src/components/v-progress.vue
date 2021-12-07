<template>
  <div class="slider relative h-1 w-full">
    <div class="line absolute h-1 bg-ethiopia-green-50 w-full"></div>
    <div class="subline absolute inc bg-ethiopia-green-400 h-1"></div>
    <div class="subline absolute dec bg-ethiopia-green-400 h-1"></div>
  </div>
</template>

<script>
export default {
  name: 'v-progress',
}
</script>

<style scoped>
.slider {
  overflow-x: hidden;
}

.inc {
  animation: increase 2s infinite;
}
.dec {
  animation: decrease 2s 0.5s infinite;
}

@keyframes increase {
  from {
    left: -5%;
    width: 5%;
  }
  to {
    left: 130%;
    width: 100%;
  }
}
@keyframes decrease {
  from {
    left: -80%;
    width: 80%;
  }
  to {
    left: 110%;
    width: 10%;
  }
}
</style>