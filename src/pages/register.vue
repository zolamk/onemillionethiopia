<script setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import register from '@/queries/register.gql'
import { useToast, POSITION } from "vue-toastification";
import _get from "lodash.get"

const toast = useToast({
    position: POSITION.TOP_RIGHT
})

const emit = defineEmits(["close"])

const valid = ref(false)

const person = ref({
    name: undefined,
    email: undefined,
    country_id: undefined
})

const errors = ref({
    email: undefined
})

const { loading, mutate, onDone, onError } = useMutation(register)

onDone(() => {
    toast.success("Welcome Home! Thank You For Registering")
    emit("close")
})

onError(error => {
    let message = _get(error, "graphQLErrors[0].message")

    if (message && message.includes("people_pkey")) {
        errors.value.email = "This email address has already been registered!"
        toast.error(errors.value.email)
        return
    }

    toast.error("Couldn't register you right now! please try again later")

    console.error(error)

})

</script>

<template>
    <v-form
        @submit.prevent="mutate({ person })"
        v-model="valid"
        class="bg-white m-4 shadow p-8 rounded-lg"
    >
        <v-input v-model="person.name" :validation-rules="rules.required" label="Name *" />
        <v-input
            v-model="person.email"
            :validation-rules="rules.required.concat(rules.email)"
            :error-messages="errors.email"
            label="Email *"
        />
        <v-country
            v-model="person.country_id"
            :validation-rules="rules.required"
            class="w-full"
            label="Country *"
        />
        <div class="text-right mt-4">
            <v-button
                :disabled="!valid"
                type="submit"
                :loading="loading"
                class="bg-ethiopia-green-100 text-pale-sky px-8 py-1 rounded"
            >Save</v-button>
        </div>
    </v-form>
</template>