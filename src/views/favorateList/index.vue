<template>
    <div class="image-list">
        <div
            class="image-item"
            v-for="(item, index) in imageUrls"
        >
            <v-img
                :key="index"
                height="300"
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
</template>
<script>
import { ref, reactive } from 'vue'
import { getFavoriteImagesByUserId, removeFavoriteImage } from '@/api/image'
import { getUserId } from '@/utils/auth'
import { messageSnackbar, confirmSnackbar } from '@/components/CustomerSnackbar'

export default {
    name: 'FavorateList',
    setup() {
        const imageUrls = ref([])

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
                    messageSnackbar({
                        color: 'success',
                        message: item.id ? '取消收藏' : '收藏成功',
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
                messageSnackbar({
                    color: 'error',
                    message: item.id ? '取消失败' : '收藏失败',
                })
            }
        }

        async function getFavoriteImageList() {
            try {
                if(getUserId()) {
                    const res = await getFavoriteImagesByUserId(getUserId())
                    if(res.code === 200) {
                        imageUrls.value = res.data
                        messageSnackbar({
                            color: 'success',
                            message: '获取收藏列表成功',
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        return {
            handleFavorite,
            getFavoriteImageList,
            imageUrls,
        }
    },
    mounted() {
        this.getFavoriteImageList()
    },
}
</script>
<style lang="scss">
.image-list {
    display: flex;
    flex-wrap: wrap;
    .image-item {
        position: relative;
        width: 300px;
        margin: 10px;
        border-radius: 10px;
        overflow: hidden;
    }
}
</style>