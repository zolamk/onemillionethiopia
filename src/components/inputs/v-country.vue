<template>
  <v-select
    v-model="modelValue"
    v-model:search="search"
    @update:modelValue="
      (e) => {
        emit('update:modelValue', e);
      }
    "
    :label="label"
    text="name"
    value="id"
    :multiple="multiple"
    :loading="loading"
    :items="items"
  />
</template>

<script setup>
import query from "@/queries/countries.gql";
import { useQuery, useResult } from "@vue/apollo-composable";
import { ref, toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  role: {
    type: String,
  },
  label: {
    type: String,
    default: "Country",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Array],
  },
  errorMessages: {
    type: String,
  }
});

let search = ref(undefined);

const { result, loading } = useQuery(
  query,
  {
    where: {
      name: {
        _ilike: search,
      },
    },
  },
  {
    debounce: 250,
    context: {
      headers: {
        "x-hasura-role": props.role,
      },
    },
  }
);

const items = useResult(result, undefined, (data) => data.items);
</script>