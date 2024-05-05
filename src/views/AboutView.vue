<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn>
      Button
    </v-btn>
    <SvgIcon icon-class="eye-open" class-name="hahahah"></SvgIcon>
    <SvgIcon icon-class="community"></SvgIcon>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import { getCountInfo } from "@/api/user";
import {getUserId} from "@/utils/auth";

defineOptions({
  name: "About"
})

async function getDashCountInfo() {
  try {
    const res = await getCountInfo(getUserId())
    console.log(res)
  } catch (err) {

  }
}

onMounted(() => {
  getDashCountInfo()
})
</script>

<style>
.hahahah {
    color: red;
    font-size: 20px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
