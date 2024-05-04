import { ref, reactive } from 'vue'

export const messageSnackbarInfo = reactive({
    color: 'success',
    text: 'This is a success snackbar.',
})
export const messageSnackbarOpen = ref(false)

export const confirmDialogOpen = ref(false)
export const confirmDialogInfo = reactive({
    title: '提示',
    text: 'This is a confirm dialog.',
    color: 'warning',
    resolve: null,
    reject: null,
})

export const messageSnackbar = (options) => {
    messageSnackbarInfo.text = options.message
    messageSnackbarInfo.color = options.color || 'success'
    messageSnackbarOpen.value = true
}

export const confirmDialog = (options) => {
    confirmDialogInfo.text = options.text
  //   confirmSnackbarOpen.color = options.color
  confirmDialogOpen.value = true
    return new Promise((resolve, reject) => {
        confirmDialogInfo.resolve = resolve
        confirmDialogInfo.reject = reject
    })
  }
