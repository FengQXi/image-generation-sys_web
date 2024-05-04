<template lang="">
    <div class="generate-image">
        <div class="image-list">
            <div class="image-text" v-if="!imageUrls.length">
                <h1><span>AI</span> Image Generator</h1>
                <p>直接从文本中获取人工智能生成的艺术图像</p>
            </div>
            <div
                class="image-item" v-for="(item, index) in imageUrls"
                :style="{ 'width': finalWidth }"
            >
                <v-img
                    class="image-img"
                    :key="index"
                    cover
                    :src="'data:image/png;base64,' + item.b64_image"
                ></v-img>
                <SvgIcon
                    @click="handleFavorite(item)"
                    :icon-class="item.id ? 'favorite-filling' : 'favorite-empty'"
                    class="image-icon"
                ></SvgIcon>
            </div>
        </div>

        <v-container class="option-area">
            <div class="input-area">
                <v-text-field
                    v-model="inputedPrompt"
                    variant="solo"
                    label="Prompt"
                    placeholder="一个女孩站在海边"
                    @keyup.enter="handleGenerate"
                    :loading="loading"
                >
                    <template v-slot:append>
                        <v-btn
                            color="primary"
                            :loading="loading"
                            :disabled="loading"
                            @click="handleGenerate"
                        >Generate</v-btn>
                    </template>
                </v-text-field>
            </div>
            <div class="select-area">
                <div class="select-item">
                    <span>风格</span>
                    <v-select
                        class="select-button"
                        v-model="imageStyle"
                        label="Style"
                        :items="styleOptions"
                        variant="solo-filled"
                        :item-props="true"
                        clearable
                    ></v-select>
                </div>
                <div class="select-item">
                    <span>尺寸</span>
                    <v-select
                        class="select-button"
                        v-model="imageSize"
                        label="Size"
                        :items="sizeOptions"
                        variant="solo-filled"
                        :item-props="true"
                        clearable
                    ></v-select>
                </div>
                <div class="select-item">
                    <span>数量</span>
                    <v-select
                        class="select-button"
                        v-model="imageCount"
                        label="Count"
                        :items="countOptions"
                        variant="solo-filled"
                        clearable
                    ></v-select>
                </div>
            </div>
        </v-container>
    </div>
</template>
<script>
import { ref, reactive, toRefs, watch, onMounted, computed } from "vue"
import generateImage from "@/utils/generateImage"
import { addFavoriteImage, removeFavoriteImage } from "@/api/image"
import { getUserId } from '@/utils/auth.js'
import { messageSnackbar, confirmDialog } from "@/components/CustomerSnackbar"
import { mockImage } from "@/utils/mock"

export default {
    name: "GenerateImage",
    setup(props) {
        const inputedPrompt = ref("")
        const imageStyle = ref("Base")
        const imageSize = ref("1024x1024")
        const showSize = ref("1024x1024")
        const imageCount = ref(2)
        const imageUrls = ref([])

        const loading = ref(false)

        const sizeOptions = reactive([
            {
                title: "768x768",
                subtitle: '适用头像',
                value: "768x768",
            },
            {
                title: "1024x1024",
                subtitle: '适用头像',
                value: "1024x1024",
            },
            {
                title: "1024x768",
                subtitle: '适用文章配图',
                value: "1024x768",
            },
            {
                title: "2048x1536",
                subtitle: '适用文章配图',
                value: "2048x1536",
            },
            {
                title: "768x1024",
                subtitle: '适用海报传单',
                value: "768x1024",
            },
            {
                title: "2048x1152",
                subtitle: '适用电脑壁纸',
                value: "2048x1152",
            },
            {
                title: "1152x2048",
                subtitle: '适用海报传单',
                value: "1152x2048",
            },
        ])
        const styleOptions = reactive([
            {
                title: "基础风格",
                subtitle: 'Base',
                value: "Base",
            },
            {
                title: "3D模型",
                subtitle: '3D Model',
                value: "3D Model",
            },
            {
                title: "模拟胶片",
                subtitle: 'Analog Film',
                value: "Analog Film",
            },
            {
                title: "动漫",
                subtitle: 'Anime',
                value: "Anime",
            },
            {
                title: "电影",
                subtitle: 'Cinematic',
                value: "Cinematic",
            },
            {
                title: "漫画",
                subtitle: 'Comic Book',
                value: "Comic Book",
            },
            {
                title: "工艺黏土",
                subtitle: 'Craft Clay',
                value: "Craft Clay",
            },
            {
                title: "数字艺术",
                subtitle: 'Digital Art',
                value: "Digital Art",
            },
            {
                title: "霓虹朋克",
                subtitle: 'Neonpunk',
                value: "Neonpunk",
            },
            {
                title: "像素艺术",
                subtitle: 'Pixel Art',
                value: "Pixel Art",
            },
        ])
        const countOptions = reactive([1, 2, 3, 4])

        const finalWidth = computed(() => {
            const [ width, height ] = showSize.value.split('x')
            return 300 / height * width + 'px'
        })


        async function handleGenerate() {
            const data = {
                prompt: inputedPrompt.value,
                n: imageCount.value,
                style: imageStyle.value,
                size: imageSize.value,
                user_id: getUserId(),
            }
            showSize.value = imageSize.value,
            loading.value = true
            try {
                const res = await generateImage(data)
                loading.value = false
                if (res.error_code) {
                    console.log(res.error_msg);
                    messageSnackbar({
                        color: 'error',
                        message: '生成失败-' + res.error_msg,
                    })
                }
                else {
                    imageUrls.value = res.data
                    messageSnackbar({
                        color: 'success',
                        message: '生成成功',
                    })
                }
            } catch (error) {
                loading.value = false
                console.log(error, 'handleGenerateFalse');
                messageSnackbar({
                    color: 'error',
                    message: '生成失败-' + error,
                })
            }
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
                    style: imageStyle.value + "|" + imageSize.value
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

        onMounted(() => {
            console.log(mockImage, 'mockImage');
            imageUrls.value = mockImage
            showSize.value = '1152x2048'  
        })

        return {
            inputedPrompt,
            imageUrls,
            handleGenerate,
            loading,
            handleFavorite,
            sizeOptions,
            styleOptions,
            countOptions,
            imageCount,
            imageStyle,
            imageSize,
            finalWidth,
        }
    },
}
</script>
<style lang="scss">
.generate-image {
    padding: 5px;
    .image-list {
        height: calc(100vh - 70px - 225px);
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        position: reactive;
        .image-text {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            h1 {
                font-size: 3.75rem;
            }
            p {
                color: rgb(64, 64, 64);
                text-align: center;
            }
        }
        .image-item {
            margin: 10px;
            border-radius: 5px;
            height: 300px;
            position: relative;
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
    }
    .option-area {
        height: calc(225px - 20px - 10px);
        overflow: hidden;
        .select-area {
            display: flex;
            justify-content: space-evenly;
            .select-item {
                align-items: center;
                border-radius: 10px;
                border: 1px solid #fff;
                height: 100px;
                width: 250px;
                color: #3f51b5;
                text-align: center;
                span {
                    color: rgb(113, 115, 124);
                    margin-bottom: 10px;
                }
                .select-button {
                    width: 200px;
                    margin-left: 20px;
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>