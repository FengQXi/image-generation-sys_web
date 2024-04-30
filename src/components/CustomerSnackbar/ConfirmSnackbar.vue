<template lang="">
    <v-snackbar
      v-model="confirmSnackbarOpen"
      color="primary"
      variant="tonal"
      :timeout="30000"
      multi-line
    >
        {{ confirmSnackbarInfo.text }}

        <template v-slot:actions>
            <v-btn
                color="warning"
                @click="handleCancelSnackbar"
            >
                取消
            </v-btn>
            <v-btn
                color="success"
                @click="handleConfirmSnackbar"
            >
                确定
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script>
import { confirmSnackbarInfo, confirmSnackbarOpen } from './index';
export default {
    name: "ConfirmSnackbar",
    setup() {
        function handleConfirmSnackbar() {
            confirmSnackbarInfo.resolve("confirm")
            confirmSnackbarOpen.value = false
        }

        function handleCancelSnackbar() {
            confirmSnackbarInfo.reject("cancel")
            confirmSnackbarOpen.value = false
        }

        return {
            confirmSnackbarInfo,
            confirmSnackbarOpen,
            handleConfirmSnackbar,
            handleCancelSnackbar
        }
    }
}
</script>
<style lang="">
    
</style>