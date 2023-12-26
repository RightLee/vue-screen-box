###  一个vue3的全屏组件  
#### A full screen component of vue3

页面锁屏，放大和缩小浏览器，屏幕比例保持不变


###### Installation
```js
npm install vue-screen-box
```

单页面注册
```js
import VueScreenBox from 'vue-screen-box'

components:{
    VueScreenBox
}
```

全局注册
```js
import VueScreenBox from 'vue-screen-box'
app.use(VueScreenBox)
```

页面使用组件
```js
<VueScreenBox>
    //页面具体内容
</VueScreenBox>
```

尺寸默认`1920x1080`,可配置固定尺寸，配置方法如下:
```js
<VueScreenBox :options="{ width:3840, height:2160 }">
    //页面具体内容
</VueScreenBox>
```

###### MIT Licenced