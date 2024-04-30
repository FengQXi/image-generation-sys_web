<template>
    <!-- <div v-if="isUrlExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" /> -->
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script setup>
import { isExternal } from '@/utils/validate';
import { computed } from 'vue';

const props = defineProps({
    iconClass: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    }
})

const iconName = computed(() => {
    return `#icon-${props.iconClass}`
})
const svgClass = computed(() => {
    if(props.className) {
        return 'svg-icon ' + props.className
    } else {
        return 'svg-icon '
    }
})
const isUrlExternal = computed(() => {
    return isExternal(props.iconClass)
})
const styleExternalIcon = computed(() => {
    return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
    }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>