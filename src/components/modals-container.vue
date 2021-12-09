<template>
  <div id="modals-container">
    <div class="modal" v-for="modal in modals" :key="modal.id">
      <div @click="remove(modal.id)" class="overlay"></div>
      <component class="z-50" @close="remove(modal.id)" :is="modal.component" v-bind="modal.props" />
    </div>
  </div>
</template>
<script>
import generate_id from "lodash.uniqueid";
export default {
  data() {
    return {
      modals: [],
    };
  },
  created() {
    this.$app.config.globalProperties.__modalsContainer = this;
  },
  methods: {
    add(component, props) {
      const id = `modal_${generate_id()}`;

      this.modals.push({
        id,
        component,
        props,
      });
    },
    remove(id) {
      const index = this.modals.findIndex((v) => v.id === id);

      if (index !== -1) {
        this.modals.splice(index, 1);
      }
    },
  },
};
</script>
