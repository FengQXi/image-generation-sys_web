<template>
    <div class="image-list">
        <div class="pointer" ref="pointerRef">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-br"></div>
            <div class="corner corner-bl"></div>
            <div class="pointer-show">
                <div class="pointer-message">
                    <span>{{ focusedItem?.style?.split("|")[0] }}</span>
                    <span>{{ focusedItem?.style?.split("|")[1] }}</span>
                </div>
                <div class="pointer-btns">
                    <span @click="handlePreview">预览</span>
                    <span @click="handlePublish">发布</span>
                    <span @click="handleDownload">下载</span>
                </div>
            </div>
        </div>
        <div
            class="image-item"
            v-for="(item, index) in imageUrls"
            @mouseenter="(e) => handleMouseenter(e, item)"
        >
            <v-img
                class="image-img"
                :key="index"
                height="300"
                cover
                :src="'data:image/png;base64,' + item.imageData"
            ></v-img>
            <SvgIcon
                class="image-icon"
                @click="handleFavorite(item)"
                :icon-class="item.id ? 'favorite-filling' : 'favorite-empty'"
            ></SvgIcon>
        </div>
    </div>
    <v-dialog
        v-model="downloadDialog"
        max-width="300"
    >
      <v-card
          title="下载"
      >
        <v-card-text>
          <v-row dense>
            <v-col
                cols="12"
            >
              <v-text-field
                  v-model="imageName"
                  placeholder="image"
                  label="name"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*请输入下载名称</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Close"
              variant="plain"
              @click="downloadDialog = false"
          ></v-btn>

          <v-btn
              color="primary"
              text="Save"
              variant="tonal"
              @click="handleDownloadConfirm"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import {onMounted, reactive, ref} from 'vue'
import { getFavoriteImagesByUserId, removeFavoriteImage, addFavoriteImage, publishImgToSociety } from '@/api/image'
import { getUserId } from '@/utils/auth'
import { downloadImage } from "@/utils/downloadImage";
import { messageSnackbar, confirmDialog } from '@/components/CustomerSnackbar'
import {tr} from "vuetify/locale";

export default {
    name: 'FavorateList',
    setup() {
        const imageUrls = ref([])
        const pointerRef = ref(null)

        const focusedItem = ref({})
        const imageName = ref("")
        const downloadDialog = ref(false)

        async function handleFavorite(item) {
            let param, requestMethod
            // 根据id判断是否已经收藏
            if(item.id) {
                param = item.id
                requestMethod = removeFavoriteImage
                
                try{
                    await confirmDialog({
                        text: '确定取消收藏吗？',
                    })
                } catch (error) {
                    return
                }
            }
            else {
                param = {
                    userId: getUserId(),
                    description: item.description,
                    imageData: item.imageData,
                    style: item.style,
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

        function handleMouseenter(e, item) {
            focusedItem.value = item
            pointerRef.value.style.setProperty('--x', e.target.offsetLeft + 'px')
            pointerRef.value.style.setProperty('--y', e.target.offsetTop + 'px')
            pointerRef.value.style.setProperty('--s', e.target.offsetWidth + 'px')
        }

        async function handlePublish() {
            const param = {
                userId: parseInt(getUserId()),
                imageId: focusedItem.value.id,
            }
            try {
                const res = await publishImgToSociety(param)
                if(res.code === 200) {
                    messageSnackbar({
                        message: "发布成功",
                        color: "success",
                    })
                }
                else {
                    messageSnackbar({
                        message: res.message || "发布失败",
                        color: "error"
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }

        function handleDownload() {
            downloadDialog.value = true
            imageName.value = ""
        }

        function handleDownloadConfirm() {
            downloadImage({
                base64: focusedItem.value.imageData,
                name: imageName.value
            })
            downloadDialog.value = false
        }

        function handlePreview() {

        }

        return {
            handleFavorite,
            getFavoriteImageList,
            handleMouseenter,
            handlePublish,
            handleDownload,
            handleDownloadConfirm,
            handlePreview,
            imageUrls,
            pointerRef,
            imageName,
            downloadDialog,
            focusedItem,
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
    position: relative;
    .image-item {
        position: relative;
        width: 300px;
        margin: 25px;
        border-radius: 10px;
        .image-img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
        .image-icon {
            position: absolute;
            color: #FFC24C;
            right: -8px;
            top: -8px;
            cursor: pointer;
        }
    }
    .pointer {
        position: absolute;
        --l: 30px;
        --g: 15px;
        --t: 3px;
        --s: 300px; // 正方形
        --x: -400px;
        --y: -400px;
        width: calc(var(--s) + var(--g) * 2);
        height: calc(var(--s) + var(--g) * 2);
        //border: var(--t) solid #938888;
        left: calc(var(--x) - var(--g));
        top: calc(var(--y) - var(--g));
        transition: 0.5s;
        //--mask: conic-gradient(
        //        at var(--l) var(--l),
        //        transparent 75%,
        //        red 75%
        //) 0 0
        ///
        //calc(100% - var(--l)) calc(100% - var(--l));
        //-webkit-mask: var(--mask);
        //mask: var(--mask);
        .corner {
            width: var(--l);
            height: var(--l);
            position: absolute;
        }
        .corner-tl {
            top: 0;
            left: 0;
            border-top: var(--t) solid #938888;
            border-left: var(--t) solid #938888;
        }
        .corner-tr {
            top: 0;
            right: 0;
            border-top: var(--t) solid #938888;
            border-right: var(--t) solid #938888;
        }
        .corner-bl {
            bottom: 0;
            left: 0;
            border-bottom: var(--t) solid #938888;
            border-left: var(--t) solid #938888;
        }
        .corner-br {
            bottom: 0;
            right: 0;
            border-bottom: var(--t) solid #938888;
            border-right: var(--t) solid #938888;
        }
        .pointer-show {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            flex-direction: column;
            z-index: 5;
            .pointer-message {
                text-align: center;
                display: flex;
                flex-direction: column;
                span {
                    background-color: #9C96E6;
                    color: #ffffff;
                    border-radius: 10px;
                }
            }
            .pointer-btns {
                span {
                    display: inline-block;
                    margin: 10px;
                    background-color: #2c3e50;
                    border-radius: 5px;
                    pointer-events: auto;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>