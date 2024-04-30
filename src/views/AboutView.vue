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

<script>
export default {
    name: 'About',
    
}
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
