<template>
  <div class="relative inline-block" ref="container">
    <v-input
      :loading="props.loading"
      :label="props.label"
      ref="input"
      @input="(e) => emit('update:search', `${e.target.value}%`)"
      @click="show = true"
      :register="false"
      :placeholder="placeholder"
      :error-messages="valid || props.errorMessages"
    >
      <template v-if="multiple">
        <template v-for="item in items" :key="item[value]">
          <template v-if="selected[item[value]]">
            <span
              class="bg-green ml-1 h-5 text-sm my-1 flex-shrink text-white px-2 rounded"
            >{{ item[text] }}</span>
          </template>
        </template>
      </template>
    </v-input>
    <ul
      v-show="show"
      class="absolute z-10 w-full bg-white border shadow -mt-6 max-h-56 rounded-md text-base overflow-auto"
    >
      <li
        v-for="item in items"
        :key="item.id"
        @click="select(item)"
        class="border-b select-none relative py-3 px-3 hover:bg-green text-pale-sky-600 cursor-pointer"
      >
        <div class="flex items-center justify-between">
          <span class="text-black font-semibold block truncate">
            {{
              item.name
            }}
          </span>
          <CheckIcon v-if="multiple && selected[item[value]]" class="w-5 h-5 text-black" />
          <CheckIcon v-else-if="selected === item[value]" class="w-5 h-5 text-black" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { CheckIcon, XIcon } from "@heroicons/vue/solid";
import { computed, ref, inject, toRefs } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  label: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
  text: {
    type: String,
    default: "name",
  },
  value: {
    type: String,
    default: "id",
  },
  search: {
    type: String,
  },
  modelValue: {
    type: [String, Array],
    default() {
      return [];
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: String,
  },
  validationRules: {
    type: Array,
  },
});

const emit = defineEmits(["update:modelValue", "update:search"]);

const { modelValue: v } = toRefs(props);

let container = ref(null);

let show = ref(false);

const form = inject("form");

let input = ref(null);

onClickOutside(container, () => (show.value = false));

const selected = computed({
  get() {
    const s = {};
    if (props.multiple) {
      for (let i in v.value) {
        s[v.value[i]] = true;
      }
      return s;
    }
    return v.value;
  },
});

const item = computed(() => {
  if (props.multiple) return undefined;

  let item = props.items.find((e) => e && e[props.value] === v.value);

  return item;
});

const placeholder = computed(() => {
  if (item && item.value) {
    return item.value[props.text];
  }
});

const valid = computed(() => {
  for (let r in props.validationRules) {
    r = props.validationRules[r];

    let valid = r(v.value);

    if (typeof valid === "string") return valid;
  }
});

const select = (item) => {
  if (props.multiple) {
    v.value.push(item[props.value]);
    emit("update:modelValue", v.value);
    return;
  }

  emit("update:modelValue", item[props.value]);
  input.value.clear();
  show.value = false;
};

if (form && props.register) {
  form.register(valid);
}

const clear = () => {
  emit("update:modelValue", undefined);
};
</script>;