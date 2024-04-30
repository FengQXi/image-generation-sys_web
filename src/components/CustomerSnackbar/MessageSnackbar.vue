<template lang="">
    <v-snackbar
        :timeout="2000"
        :color="messageSnackbarInfo.color"
        variant="tonal"
        v-model="messageSnackbarOpen"
    >
        {{ messageSnackbarInfo.text }}
    </v-snackbar>
</template>
<script>
import { messageSnackbarInfo, messageSnackbarOpen } from "./index"
export default {
    name: "MessageSnackbar",
    setup() {
        return {
            messageSnackbarInfo,
            messageSnackbarOpen
        }
    }
}
</script>
<style lang="">
    
</style>