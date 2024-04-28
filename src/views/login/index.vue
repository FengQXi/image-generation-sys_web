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
                <v-btn prepend-icon="$vuetify" variant="tonal" @click="handleGoRegister">
                    Go Register
                </v-btn>
            </v-container>
        </v-form>
    </div>

    <v-snackbar
      :timeout="2000"
      :color="snackBarInof.color"
      variant="tonal"
      v-model="snackbarOpen"
    >
      {{ snackBarInof.text }}
    </v-snackbar>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { register, login } from '@/api/user';

const userName = ref('')
const userPassword = ref('')

const snackBarInof = reactive({
    color: 'success',
    text: 'This is a success snackbar.',
})
const snackbarOpen = ref(false)

const user = useUserStore()
const router = useRouter()

async function handleLogin() {
    try {
        const res = await login({
             username: userName.value,
             password: userPassword.value
        })

        console.log(res);
        if(res.code === 200) {
            const { token, id } = res.data
            user.setAuthorization({
                id: id,
                token: token,
            })
            handleSnackBarOpen({
                color: 'success',
                text: res.message
            })
            router.push('/')
        }
        else {
            handleSnackBarOpen({
                color: 'error',
                text: res.message
            })
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleRegister() {
    try {
        const res = await register({
            username: userName.value,
            password: userPassword.value
        })
        if (res.code === 200) {
            // 去登录
        }
        else {
            handleSnackBarOpen({
                color: 'error',
                text: res.message
            })
        }
    } catch (error) {
        console.log(error)
    }
}

function handleGoRegister() {
    router.push('/register')
}

function handleSnackBarOpen(data) {
    const { color, text } = data
    snackBarInof.color = color
    snackBarInof.text = text
    snackbarOpen.value = true
}
</script>
<style lang="">

</style>