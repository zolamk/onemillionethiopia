<template>
  <button
    class="disabled:bg-opacity-40 disabled:cursor-default"
    :disabled="disabled"
    :type="type"
  >
    <BanIcon v-if="loading" class="animate-spin h-5 w-5" />
    <slot v-else></slot>
  </button>
</template>

<script>
import { BanIcon } from "@heroicons/vue/solid";

export default {
  name: "v-button",
  components: {
    BanIcon,
  },
  props: {
    type: {
      type: String,
      default: "submit",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>