<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup>
import { provide, computed, watch, ref } from "vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

let inputs = ref([]);

const register = (input) => {
  inputs.value.push(input);
};

const valid = computed(() => {
  for (let i in inputs.value) {
    i = inputs.value[i];
    if (typeof i.value === "string") return false;
  }
  return true;
});

watch(valid, () => emit("update:modelValue", valid.value));

emit("update:modelValue", valid.value);

provide("form", {
  register,
});
</script>