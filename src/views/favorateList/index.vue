<template lang="">
    <div>
        <div
            class="image-item"
            style="width: 291px; position: relative;"
            v-for="(item, index) in imageUrls"
        >
            <v-img
                :key="index"
                :width="291"
                aspect-ratio="16/9"
                cover
                :src="'data:image/png;base64,' + item.imageData"
            ></v-img>
            <SvgIcon
                @click="handleFavorite(item)"
                :icon-class="item.id ? 'eye-open' : 'eye-close'"
                style="position: absolute; right: 0; top: 0; cursor: pointer;"
            ></SvgIcon>
        </div>
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
import { ref, reactive } from 'vue'
import { getFavoriteImagesByUserId, removeFavoriteImage } from '@/api/image'
import { getUserId } from '@/utils/auth'

export default {
    name: 'FavorateList',
    setup() {
        const imageUrls = ref([])

        const snackBarInfo = reactive({
            color: 'success',
            text: 'This is a success snackbar.',
        })
        const snackbarOpen = ref(false)

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
                    description: item.description,
                    imageData: item.imageData,
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

        async function getFavoriteImageList() {
            try {
                if(getUserId()) {
                    const res = await getFavoriteImagesByUserId(getUserId())
                    if(res.code === 200) {
                        imageUrls.value = res.data
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        return {
            handleFavorite,
            snackbarOpen,
            snackBarInfo,
            getFavoriteImageList,
            imageUrls,
        }
    },
    mounted() {
        console.log('FavorateList mounted');
        this.getFavoriteImageList()
    },
}
</script>
<style lang="">
    
</style>