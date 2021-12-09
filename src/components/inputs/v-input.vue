<template>
  <div class="inline-block w-full" style="min-width: 240px;">
    <label
      v-if="!props.hideDetails"
      class="block mb-2 text-sm relative text-pale-sky-800 font-normal"
    >{{ label }}</label>
    <v-progress
      v-if="props.loading"
      class="absolute w-full top-1 z-50 rounded-tr-md rounded-tl-md"
    />
    <div
      class="relative focus-within:border-ethiopia-green-200 border border-pale-sky-400 box-border transition-all shadow-sm w-full bg-transparent rounded-md"
    >
      <input
        :type="type"
        ref="input"
        v-model="v"
        @input="(e) => emit('update:modelValue', e.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @click="$emit('click')"
        class="w-full bg-transparent p-2 placeholder-pale-sky text-pale-sky flex-grow rounded-md outline-none"
        :placeholder="props.placeholder"
      />
    </div>
    <p
      v-if="!props.hideDetails"
      class="text-red-300 text-sm pt-2 text-right"
    >{{ valid || errorMessages }}&nbsp;</p>
  </div>
</template>

<script setup>
import { inject, computed, toRefs, ref } from "vue";
import { XIcon } from "@heroicons/vue/solid";

const emit = defineEmits(["update:modelValue", "clear", "focus", "blur", "click"]);

const props = defineProps({
  label: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
  },
  validationRules: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  register: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
});

const v = ref(props.modelValue);

let input = ref(undefined);

const form = inject("form");

const valid = computed(() => {
  for (let r in props.validationRules) {
    r = props.validationRules[r];

    let valid = r(v.value);

    if (typeof valid === "string") return valid;
  }
});

if (form && props.register) {
  form.register(valid);
}

const clear = () => {
  v.value = undefined;
  emit("update:modelValue", undefined);
  emit("clear");
};

const focus = () => input.value.focus();

defineExpose({
  clear,
  focus,
  valid,
});
</script>