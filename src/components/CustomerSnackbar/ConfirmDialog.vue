<template lang="">
    <v-dialog
      v-model="confirmDialogOpen"
      max-width="400"
      persistent
    >
        <v-card>
            <template v-slot:title>
                <v-card-title>{{ confirmDialogInfo.title || '提示' }}</v-card-title>
            </template>
            <template v-slot:default>
                <v-card-text>
                    <svg-icon icon-class="warning" class-name="icon-warning" />
                    {{ confirmDialogInfo.text }}
                </v-card-text>
            </template>
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="handleCancelDialog">
                    <svg-icon icon-class="cancel" class-name="icon-cancel" />
                    <span>取消</span>
                </v-btn>

                <v-btn @click="handleConfirmDialog">
                    <svg-icon icon-class="confirm" class-name="icon-confirm" />
                    <span>确认</span>
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { defineOptions } from 'vue'
import { confirmDialogOpen, confirmDialogInfo } from './index';

defineOptions({
    name: "ConfirmDialog",
})
function handleCancelDialog() {
    confirmDialogInfo.reject("cancel")
    confirmDialogOpen.value = false
}
function handleConfirmDialog() {
    confirmDialogInfo.resolve("confirm")
    confirmDialogOpen.value = false
}
</script>
<style lang="scss">
.icon-cancel, .icon-confirm {
    margin-right: 5px;
}
.icon-cancel {
    color: #ff0000;
}
.icon-confirm {
    color: #00ff00;
}
.icon-warning {
    color: #FFC24C;
}
</style>