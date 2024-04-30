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
                <!-- <v-btn prepend-icon="$vuetify" variant="tonal" @click="handleGoRegister">
                    Go Register
                </v-btn> -->
            </v-container>
        </v-form>

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

                <v-btn prepend-icon="$vuetify" variant="tonal" @click="handleRegister">
                    Register
                </v-btn>
            </v-container>
        </v-form>
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { register, login } from '@/api/user';
import { messageSnackbar } from '@/components/CustomerSnackbar/index'

const user = useUserStore()
const router = useRouter()
const route = useRoute()

const valid = ref(true)

const userName = ref('')
const userPassword = ref('')

const redirect = ref(null)

watch(
    route,
    (newValue, oldValue) => {
        // 获取重定向地址，方便登录后直接重定向路由
        redirect.value = newValue.query && newValue.query.redirect
    },
    { immediate: true }
)

async function handleLogin() {
    try {
        const res = await login({
            username: userName.value,
            password: userPassword.value
        })

        console.log(res);
        if (res.code === 200) {
            const { token, userId } = res.data
            user.setAuthorization({
                id: userId,
                token: token,
            })
            messageSnackbar({
                color: 'success',
                message: res.message
            })
            router.push({ path: redirect.value || '/' })
        }
        else {
            messageSnackbar({
                color: 'error',
                message: res.message
            })
        }
    } catch (error) {
        messageSnackbar({
            color: 'error',
            message: error
        })
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
            handleSnackBarOpen({
                color: 'success',
                text: res.message
            })
        }
        else {
            handleSnackBarOpen({
                color: 'error',
                text: res.message
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// function handleGoRegister() {
//     router.push('/register')
// }
</script>
<style lang="">

</style>