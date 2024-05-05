<template>
    <div class="society-list">
        <div
            class="image-item"
            v-for="(item, index) in imageUrls"
        >
            <v-img
                class="image-img"
                :key="index"
                height="300"
                cover
                :src="'data:image/png;base64,' + item.imageData"
            ></v-img>
<!--            <SvgIcon-->
<!--                class="image-icon"-->
<!--                @click="handleFavorite(item)"-->
<!--                :icon-class="item.id ? 'favorite-filling' : 'favorite-empty'"-->
<!--            ></SvgIcon>-->
        </div>
    </div>
</template>

<script setup>
import { getSocietyImg } from "@/api/image";
import {onMounted, ref} from "vue";

defineOptions({
   name: "SocietyList"
})

const imageUrls = ref([])
async function getSocietyImages() {
    try {
        const res = await getSocietyImg()
        if(res.code === 200) {
            imageUrls.value = res.data
        }
    } catch (err) {
        console.log(err)
    }
}

onMounted(() => {
    getSocietyImages()
})
</script>

<style lang="scss">
.society-list {
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
}
</style>