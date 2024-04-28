<template lang="">
    <div>
        <v-form v-model="valid">
            <v-container>
                <v-text-field
                    v-model="userName"
                    label="First name"
                    hide-details
                    required
                ></v-text-field>
                <v-text-field
                    v-model="userPassword"
                    label="Last name"
                    hide-details
                    required
                ></v-text-field>

                <v-btn prepend-icon="$vuetify" variant="tonal" @click="handleLogin">
                    Login
                </v-btn>
            </v-container>
        </v-form>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userName = ref('')
const userPassword = ref('')

const user = useUserStore()

async function handleLogin() {
    try {
        await user.login({
            username: userName.value,
            password: userPassword.value
        })
        // 路由跳转
        this.$router.push('/')
    } catch (error) {
        console.log(error)
    }
}
</script>
<style lang="">

</style>