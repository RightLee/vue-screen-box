
<template>
    <div id="vue-screen-box-container" ref="vueScreenBoxRef">
        <template v-if="ready">
            <slot />
        </template>
    </div>
</template>
<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
//组件传参(默认1920,1080)
const props = defineProps({
    options:{
        type:Object,
        default: () => ({
            //默认为1920*1080尺寸
            width: 1920,
            height: 1080,
        }),
    }
})

//通知外部方法回调
const emits = defineEmits(['complete'])

const width = ref(0)
const height = ref(0)
const originalWidth = ref(0);
const originalHeight = ref(0);
const vueScreenBoxRef = ref(null);
const observer = ref(null);
const ready = ref(false);

onMounted(async () => {
    ready.value = false
    await initSize()
    updateSize()
    updateScale()
    //防抖监听视图变化、执行回调
    window.addEventListener("resize", debounce(300, onResize));
    initMutationObserver();
    ready.value = true;
    emits('complete',{ type:'complete' })
})

//初始化尺寸
const initSize = () =>{
    return new Promise(resolve =>{
        nextTick(() =>{
            //获取大屏的真实尺寸
            if ( props.options && props.options.width && props.options.height) {
                width.value = props.options.width;
                height.value = props.options.height;
            } else {
                width.value = vueScreenBoxRef.value.clientWidth;
                height.value = vueScreenBoxRef.value.clientHeight;
            }
            //获取大屏画布尺寸
            if (!originalWidth.value || !originalHeight.value) {
                originalWidth.value = screen.width;
                originalHeight.value = screen.height;
            }
            resolve();
        })
    })
}

//更新尺寸
const updateSize = () => {
    if (width.value && height.value) {
        vueScreenBoxRef.value.style.width = `${width.value}px`;
        vueScreenBoxRef.value.style.height = `${height.value}px`;
    }
};

//更新缩放
const updateScale = () => {
    //获取真实的视口尺寸
    const currentWidth = document.body.clientWidth;
    const currentHeight = document.body.clientHeight;
    //获取大屏最终的尺寸
    const realWidth = width.value || originalWidth.value;
    const realHeight = height.value || originalHeight.value;
    const widthScale = currentWidth / realWidth;
    const heightScale = currentHeight / realHeight;
    vueScreenBoxRef.value.style.transform = `scale(${widthScale},${heightScale})`;
};

//监听尺寸的回调函数(初始化尺寸, 更新缩放)
const onResize = async () => {
    await initSize();
    updateScale();
};

//防抖方法(默认延时0.5s)
const debounce = (delay = 1000, callback) =>{
    let task = null
    return function (...rest){
        clearTimeout(task)
        task = setTimeout(() => {
            callback.apply(this,rest);
            emits('complete',{ type:'complete' })
        }, delay);
    }
}

//浏览器监听dom元素
const initMutationObserver = () => {
    const MutationObserver = window.MutationObserver;
    observer.value = new MutationObserver(onResize)
    observer.value.observe(vueScreenBoxRef.value, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
    })
}

onUnmounted(() => {
    window.removeEventListener("resize", onResize);
    removeMutationObserver();
});

</script>
<script>
export default {
    name:'VueScreenBox'
}
</script>
<style lang="scss" scoped>
#vue-screen-box-container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: left top;
  .button {
    font-size: 140px;
  }
}
</style>