<template lang="">
    <div>
        <v-img
            v-for="(item, index) in imageUrls"
            :key="index"
            :width="291"
            aspect-ratio="16/9"
            cover
            :src="item.b64_image"
        ></v-img>

        <v-container>
            <v-text-field
                v-model="inputedPrompt"
                label="Prompt"
                outlined
                clearable
                @keyup.enter="handleGenerate"
            ></v-text-field>

            <v-btn
                :loading="loading"
                :disabled="loading"
                @click="handleGenerate"
            >Generate</v-btn>
        </v-container>
    </div>

    <v-snackbar
        :timeout="2000"
        :color="snackBarInfo.color"
        variant="tonal"
        v-model="snackbarOpen"
    >
        {{ snackBarInfo.text }}
    </v-snackbar>
</template>
<script>
import { ref, reactive, toRefs, watch, onMounted } from "vue"
import generateImage from "../../utils/generateImage"
export default {
    name: "GenerateImage",
    setup(props) {
        const inputedPrompt = ref("")
        const imageUrls = ref([])

        const loading = ref(false)

        const snackBarInfo = reactive({
            color: 'success',
            text: 'This is a success snackbar.',
        })
        const snackbarOpen = ref(false)

        async function handleGenerate() {
            const data = {
                prompt: inputedPrompt.value,
            }
            loading.value = true
            try {
                const res = await generateImage(data)
                loading.value = false
                if (res.error_code) {
                    console.log(res.error_msg);
                }
                else {
                    imageUrls.value = res.data
                    handleSnackBarOpen({
                        color: 'success',
                        text: '生成成功',
                    })
                }
            } catch (error) {
                loading.value = false
                console.log(error);
                handleSnackBarOpen({
                    color: 'error',
                    text: '生成失败-' + error,
                })
            }
        }

        function handleSnackBarOpen(data) {
            const { color, text } = data
            snackBarInfo.color = color
            snackBarInfo.text = text
            snackbarOpen.value = true
        }

        return {
            inputedPrompt,
            imageUrls,
            handleGenerate,
            snackBarInfo,
            snackbarOpen,
            handleSnackBarOpen,
        }
    }
}
</script>
<style lang="">

</style>