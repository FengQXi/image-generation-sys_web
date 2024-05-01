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
                <svg-icon icon-class="cancel" />
            </v-btn>
            <v-btn
                color="success"
                @click="handleConfirmSnackbar"
            >
                <svg-icon icon-class="confirm" />
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