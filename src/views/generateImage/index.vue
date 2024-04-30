<template lang="">
    <div class="generate-image">
        <div
            class="image-item" style="width: 291px; position: relative;" 
            v-for="(item, index) in imageUrls"
        >
            <v-img
                :key="index"
                :width="291"
                aspect-ratio="16/9"
                cover
                :src="'data:image/png;base64,' + item.b64_image"
            ></v-img>
            <SvgIcon
                @click="handleFavorite(item)"
                :icon-class="item.id ? 'eye-open' : 'eye-close'"
                style="position: absolute; right: 0; top: 0; cursor: pointer;"
            ></SvgIcon>
        </div>

        <div class="image-item" style="width: 291px; position: relative;">
            <v-img
                class="bg-grey-lighten-2"
                src="https://picsum.photos/350/165?random"
                style="position: relative;"
            >
            </v-img>
            <SvgIcon
                @click="handleFavorite()"
                icon-class="eye-opene"
                style="position: absolute; right: 0; top: 0; cursor: pointer;"
            ></SvgIcon>
        </div>

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
import generateImage from "@/utils/generateImage"
import { addFavoriteImage, removeFavoriteImage } from "@/api/image"
import { getUserId } from '@/utils/auth.js'
import { confirmSnackbar, messageSnackbar } from "@/components/CustomerSnackbar"

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
                n: 2,
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

        async function handleFavorite(item) {
            let param, requestMethod
            // 根据id判断是否已经收藏
            if(item.id) {
                param = item.id
                requestMethod = removeFavoriteImage
            }
            else {
                param = {
                    userId: getUserId(),
                    description: inputedPrompt.value,
                    imageData: item.b64_image,
                }
                requestMethod = addFavoriteImage
            }
            try {
                const res = await requestMethod(param)
                if(res.code === 200) {
                    handleSnackBarOpen({
                        color: 'success',
                        text: item.id ? '取消收藏' : '收藏成功',
                    })
                    // 修改item的id，让下次点击能正确判断
                    if(item.id) {
                        delete item.id
                    }
                    else {
                        item.id = res.data.id
                    }
                }
            } catch (error) {
                handleSnackBarOpen({
                    color: 'error',
                    text: item.id ? '取消失败' : '收藏失败',
                })
            }
        }

        return {
            inputedPrompt,
            imageUrls,
            handleGenerate,
            snackBarInfo,
            snackbarOpen,
            handleSnackBarOpen,
            loading,
            handleFavorite,
        }
    }
}
</script>
<style lang="">

</style>