<script setup>
import { ref, watch } from 'vue'
import { useSubscription, useResult } from '@vue/apollo-composable'
import people_by_country from '@/queries/people_by_country.gql'

const { result, loading } = useSubscription(people_by_country, null, {
  fetchPolicy: "no-cache"
});

const people = useResult(result, [], data => data.people_by_country)

</script>

<template>
<div class="flex p-8">
  <div class="flex-1">
    <world-map/>
  </div>
  <div class="max-w-sm flex-1 px-3">
    <h1 class="font-bold text-2xl text-center mb-2 text-pale-sky-500">Top Countries</h1>
    <ul role="list" class="-my-5 divide-y divide-pale-sky">
      <li v-for="p in people" :key="p.country_id" class="py-4">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0 text-3xl">
            {{ p.country.icon }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-pale-sky-600 truncate">
              {{ p.country.name }}
            </p>
            <p class="text-sm text-pale-sky truncate">
              {{ p.country.native }}
            </p>
          </div>
          <div>
            <span class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-pale-sky text-sm leading-5 font-medium rounded-full text-pale-sky-900">
               {{ p.count }}
            </span>
          </div>
        </div>
      </li>
      </ul> 
  </div>
  </div>
</template>