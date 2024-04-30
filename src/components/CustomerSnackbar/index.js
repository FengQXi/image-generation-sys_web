import { ref, reactive } from 'vue'

export const messageSnackbarInfo = reactive({
    color: 'success',
    text: 'This is a success snackbar.',
})
export const messageSnackbarOpen = ref(false)

export const confirmSnackbarInfo = reactive({
    color: 'success',
    text: 'This is a success snackbar.',
})
export const confirmSnackbarOpen = ref(false)

export const confirmSnackbar = (options) => {
  confirmSnackbarInfo.text = options.message
//   confirmSnackbarOpen.color = options.color
  confirmSnackbarOpen.value = true
  return new Promise((resolve, reject) => {
    confirmSnackbarInfo.resolve = resolve
    confirmSnackbarInfo.reject = reject
  })
}

export const messageSnackbar = (options) => {
    messageSnackbarInfo.text = options.message
    messageSnackbarInfo.color = options.color
    messageSnackbarOpen.value = true
}
