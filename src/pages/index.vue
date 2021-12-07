<script setup>
import { computed, ref } from 'vue'
import { useSubscription, useResult } from '@vue/apollo-composable'
import people_by_country from '@/queries/people_by_country.gql'
import total from '@/queries/total.gql'
import { format } from 'd3-format'
import _map_keys from 'lodash.mapkeys'
import _pad from 'lodash.padstart'
import VueNumberAnimation from 'vue-number-animation/Number.vue'

const { result, loading } = useSubscription(people_by_country, null, {
  fetchPolicy: "network-only"
});

let { onResult: onTotal, loading: loading_total } = useSubscription(total, null, {
  fetchPolicy: "network-only"
})

const people = useResult(result, [], data => data.people_by_country)

const people_count_map = computed(() => {
  return _map_keys(people.value, "country_id")
})

const f = format("~s")

const legend = ref(false)

const last_total = ref(0)

const new_total = ref(0)

const last_to_go = ref(1000000)

const new_to_go = computed(() => {
  return 1000000 - new_total.value
})

const current_country = ref(undefined);

let first_load = true;

const hover_country = (data) => {
  legend.value = true
  current_country.value = {
    has_data: people_count_map.value[data.code] !== undefined,
    stat: people_count_map.value[data.code],
    data
  }
}

const leave_country = () => {
  legend.value = false
  current_country.value = undefined
}

onTotal(({ data }) => {
  first_load ? last_total.value = 0 : last_total.value = new_total.value
  first_load = false
  new_total.value = data.people_aggregate.aggregate.count
})

const format_count = (number) => {
  return _pad(number.toFixed(0), 7, '0')
}
</script>

<template>
  <div v-if="loading || loading_total" class="w-full fixed top-0 left-0">
    <v-progress />
  </div>
  <div class="px-4 py-2 flex justify-between items-center">
    <img src="../assets/logo.jpg" width="100" />
    <v-button
      class="bg-ethiopia-green-400 hover:bg-ethiopia-green-500 transition-all text-white rounded-lg text-xl font-bold h-10 px-8"
    >Register</v-button>
  </div>
  <div class="flex content-start flex-wrap h-full">
    <div class="flex-1 relative px-4 w-full min-w-420">
      <div class="text-center">
        <vue-number-animation
          class="text-pale-sky font-mono block font-extrabold text-4xl lg:text-6xl"
          ref="number"
          :from="last_total"
          :duration="2"
          :to="new_total"
          :format="format_count"
        />
        <h2 class="text-pale-sky-400 text-2xl font-semibold">So Far</h2>
      </div>
      <world-map
        :people_by_country="people_count_map"
        @hovercountry="hover_country"
        @hoverleavecountry="leave_country"
        class="w-full p-4"
      />
      <div class="text-center">
        <vue-number-animation
          class="text-pale-sky font-mono block font-extrabold text-4xl lg:text-6xl"
          ref="number"
          :from="last_to_go"
          :duration="2"
          :to="new_to_go"
          :format="format_count"
        />
        <h2 class="text-pale-sky-400 text-2xl font-semibold">To Go</h2>
      </div>
      <div
        class="bg-white absolute shadow-2xl px-8 py-4 text-center rounded-lg"
        v-if="legend && current_country.has_data"
        :style="{ left: current_country.data.position.left + 'px', top: current_country.data.position.top + 'px' }"
      >
        <h2
          class="text-2xl text-pale-sky font-bold"
        >{{ current_country.stat.country.icon }} {{ current_country.stat.country.name }}</h2>
        <h3 class="text-xl text-pale-sky-100 font-semibold">{{ current_country.stat.count }}</h3>
      </div>
    </div>
    <div class="lg:max-w-sm flex-1 mt-8 px-4 rounded-lg min-w-420 w-full">
      <h1 class="font-bold text-3xl text-center mb-4 text-pale-sky">Top Countries</h1>
      <ul>
        <li v-for="p in people" :key="p.country_id" class="py-4 shadow rounded px-2 mb-2">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0 text-3xl">{{ p.country.icon }}</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-pale-sky-600 truncate">{{ p.country.name }}</p>
              <p class="text-sm text-pale-sky truncate">{{ p.country.native }}</p>
            </div>
            <div>
              <span
                class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-pale-sky text-sm leading-5 font-medium rounded-full text-pale-sky-900"
              >{{ f(p.count) }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>