<template>
  <div id="modals-container">
    <div class="modal" v-for="modal in modals" :key="modal.id">
      <div @click="remove(modal.id)" class="overlay"></div>
      <component
        @close="remove(modal.id)"
        :is="modal.component"
        v-bind="modal.props"
      />
    </div>
  </div>
</template>

<script setup>
import generate_id from "lodash.uniqueid";
import { ref, getCurrentInstance } from "vue";

const app = getCurrentInstance().appContext;

const modals = ref([]);

const add = (component, props) => {
  const id = `modal_${generate_id()}`;

  modals.value.push({
    id,
    component,
    props,
  });
};

const remove = (id) => {
  const index = modals.value.findIndex((v) => v.id === id);

  if (index !== -1) {
    modals.value.splice(index, 1);
  }
};

app.config.globalProperties.__modalsContainer = {
  add,
  remove,
};
</script>
