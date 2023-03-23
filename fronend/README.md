# vue3

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 筆記

<hr>

## Template Syntax

[api說明](https://cn.vuejs.org/api/built-in-directives.html#v-slot)

1. v-html 插入HTML
2. v-bind 綁定 attribute，可縮寫 :id, :disabled, :href
3. 綁定多值可用 object 傳入 `<div v-bind="obj"></idv>`
4. Vue Template 僅支持「表達式」
5. v-on 縮寫 @click

### 動態參數

```html
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>

```

```html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething">

```

```html
<!-- 这会触发一个编译器警告 -->
<a :['foo' + bar]="value"> ... </a>
```

- 避免在名稱中使用大寫字母，因瀏覽器會強制將其轉換為小寫。
- 如果你的組件擁有 “someAttr” 屬性而非 “someattr”，這段代碼將不會工作。
- 單文件組件內的模板不受此限制。

```html
<a :[someAttr]="value"> ... </a>
```

Modifiers

```html
<!-- 同等 event.preventDefault() -->
<form @submit.prevent="onSubmit">...</form>
```

## 響應式 同等 React State

1. 更改響應式狀態後，DOM會自動更新
2. DOM的更新不是同步的
3. 每個組件只更新一次
4. 在 vue 中狀態都是深複製

## reactive()

 1. 只接受 obje 和 array
 2. vue 的響硬式是透過屬性訪問進行追蹤，不可隨意替換會導致響應性連結丟失

```js
let state = reactive({ count: 0 })

// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 })
```

### ref()

1. 可接受各式類型
2. 他是以Object 包裝

```html
<script setup>
import { ref } from 'vue'

const count = ref(0)

console.log(count.value)
</script>

<template>
  {{ count }} <!-- 无需 .value -->
</template>
```

## Slot 插槽

基本 和 react children 一樣

基本
```html
<!-- SubmitBtn.vue -->
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>

<SubmitButton>Save</SubmitButton>
```

具名插槽

- v-slot:header 可縮寫為 #header

```html
<!-- BaseLayout.vue -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

動態 slot

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>

```
