# Error handling

https://nuxt.com/docs/getting-started/error-handling

 (2023-07)

`Nuxt 3.6`

[TOC]

## 오류 처리

Nuxt 3는 전체 스택 프레임워크입니다. 즉, 서로 다른 컨텍스트에서 발생할 수 있는 예방할 수 없는 사용자 런타임 오류의 여러 소스가 있음을 의미합니다.

1. Vue 렌더링 생명주기 중 오류 (SSR + SPA)
2. API 또는 Nitro 서버 수명 주기 중 오류
3. 서버 및 클라이언트 시작 오류 (SSR + SPA)
4. JS 청크 다운로드 오류



> \- Vue 라이프 사이클 Hook 또는 setup 메소드에서 발생되는 에러
>
> \- Server 렌더링 중 발생되는 에러
>
> \- Server 또는 Client 내에서 onErrorCaptured 에서 처리되지 않은 에러 



### Vue 렌더링 생명주기 중 오류(SSR + SPA)

`onErrorCaptured` 를 사용하여 Vue 오류에 연결할 수 있습니다 .

또한 Nuxt 는 오류가 최상위 수준으로 전파되는 경우 호출되는 `vue:error` 후크를 제공합니다.

오류 보고 프레임워크를 사용하는 경우 `vueApp.config.errorHandler` 를 통해 전역 처리기를 제공할 수 있습니다 . 처리되더라도 모든 Vue 오류를 수신합니다.



#### 전역 오류 보고 프레임워크의 예

```javascript
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    // ...
  }
})
```



### 서버 및 클라이언트 시작 오류(SSR + SPA)

Nuxt 는 Nuxt 애플리케이션을 시작할 때 오류가 있으면 `app:error` 후크를 호출합니다 .

여기에는 다음이 포함됩니다.

- Nuxt 플러그인 실행
- `app:created` 처리 및 `app:beforeMount`후크
- Vue 앱을 HTML로 렌더링 (서버에서)
- 앱을 마운트(클라이언트 측에서) 하지만 이 경우를 `onErrorCaptured` 또는 `vue:error`로 처리해야 합니다.
- `app:mounted`후크 처리



### API 또는 Nitro 서버 수명 주기 중 오류

현재 이러한 오류에 대한 서버 측 핸들러를 정의할 수 없지만 오류 페이지를 렌더링할 수 있습니다 (다음 섹션 참조).



### JS 청크 다운로드 오류

네트워크 연결 실패 또는 새 배포 (해싱된 이전 JS 청크 URL을 무효화함) 로 인해 청크 로드 오류가 발생할 수 있습니다. Nuxt는 경로 탐색 중에 청크가 로드되지 않을 때 하드 리로드를 수행하여 청크 로딩 오류를 처리하기 위한 내장 지원을 제공합니다.

직접 처리하려는 경우 `experimental.emitRouteChunkError` (이러한 오류에 대한 후킹을 비활성화하려면) `false`또는 `manual` 설정 하여 이 동작을 변경할 수 있습니다 . 청크 로딩 오류를 수동으로 처리하려면 아이디어에 대한 [자동 구현](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/plugins/chunk-reload.client.ts)을 확인할 수 있습니다 .

`experimental.emitRouteChunkError` 를 `false`로 설정하거나(이러한 오류에 연결하지 않도록 설정) 직접 처리하려는 경우 `manual` 으로 설정하여 이 동작을 변경할 수 있습니다. 
청크 로딩 오류를 수동으로 처리하려면 아이디어에 대한 자동 구현을 확인할 수 있습니다.



## 오류 페이지 렌더링

Nuxt는 서버 수명 주기 동안 또는 Vue 애플리케이션(SSR 및 SPA 모두)을 렌더링할 때 치명적인 오류가 발생하면, JSON 응답(  `Accept: application/json` 헤더로 요청한 경우) 또는 HTML 오류 페이지를 렌더링합니다.

애플리케이션의 소스 디렉터리에 `app.vue` 와 함께 `~/error.vue` 를 추가하여 이 오류 페이지를 사용자정의 할 수 있습니다. 이 페이지에는 처리할 오류가 포함된 `error` 라는 단일 속성이 있습니다.

오류 페이지를 제거할 준비가 되면 리디렉션할 선택적 경로를 사용하는 도우미 함수 `clearError` 를 호출할 수 있습니다 (예: '안전한' 페이지로 이동하려는 경우).

> Nuxt 플러그인에 의존하는 것을 사용하기 전에 `$route` 또는 와 같은 `useRouter` 플러그인이 오류를 던진 것처럼 오류를 지울 때까지 다시 실행되지 않는지 확인하십시오 .

> Node 16에서 실행 중이고 오류 페이지를 렌더링할 때 쿠키를 설정하면 [이전에 설정한 쿠키를 덮어씁니다](https://github.com/nuxt/nuxt/pull/20585) . Node 16은 2023년 9월에 수명이 종료되므로 최신 버전의 Node를 사용하는 것이 좋습니다.



### 예

```vue
<!-- error.vue -->

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <button @click="handleError">Clear errors</button>
</template>
```



## 오류 도우미 메서드



### useError

- `function useError (): Ref<Error | { url, statusCode, statusMessage, message, description, data }>`

이 함수는 처리 중인 전역 Nuxt 오류를 반환합니다.

👉 [Docs > API > Composables > Use Error](https://nuxt.com/docs/api/composables/use-error) 에서 자세히 알아보세요 .



### createError

- `function createError (err: { cause, data, message, name, stack, statusCode, statusMessage, fatal }): Error`

이 기능을 사용하여 추가 메타데이터가 있는 오류 개체를 만들 수 있습니다. 앱의 Vue 및 Nitro 부분 모두에서 사용할 수 있으며 던져야 합니다.

`createError` 로 생성된 오류가 발생하는 경우 :

- 서버 측에서는 `clearError` 로 지울 수 있는 전체 화면 오류 페이지를 트리거합니다.
- 클라이언트 측에서는 처리할 치명적이지 않은 오류가 발생합니다. 전체 화면 오류 페이지를 트리거해야 하는 경우,  `fatal: true` 를 설정하여 이를 수행할 수 있습니다 .

### 예

```vue
<!-- pages/movies/[slug -->

<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
```



### showError

- `function showError (err: string | Error | { statusCode, statusMessage }): Error`

이 함수는 클라이언트 측에서 또는 (서버 측에서) 미들웨어, 플러그인 또는 `setup()`기능 내에서 직접 호출할 수 있습니다. `clearError` 로 지울 수 있는 전체 화면 오류 페이지를 트리거합니다.

대신 `throw createError()` 를 사용하는 것이 좋습니다 .

👉[Docs > API > Utils > Show Error](https://nuxt.com/docs/api/utils/show-error) 에서 자세히 알아보세요 .



### clearError

- `function clearError (options?: { redirect?: string }): Promise<void>`

이 함수는 현재 처리된 Nuxt 오류를 지웁니다. 또한 리디렉션할 선택적 경로를 사용합니다(예: '안전한' 페이지로 이동하려는 경우).

👉[Docs > API > Utils > Clear Error](https://nuxt.com/docs/api/utils/clear-error) 에서 자세히 알아보세요 .



## 앱 내 렌더링 오류

Nuxt는 또한 전체 사이트를 오류 페이지로 바꾸지 않고도 앱 내에서 클라이언트 측 오류를 처리할 수 있는 `<NuxtErrorBoundary>` 구성 요소를 제공합니다.

이 구성 요소는 기본 슬롯 내에서 발생하는 오류 처리를 담당합니다. 클라이언트 측에서는 오류가 최상위 수준으로 버블링되는 것을 방지하고 대신 `#error` 슬롯을 렌더링합니다.

`#error` 슬롯은 `error` 소품으로 수신됩니다. (`error = null` 로 설정하면 기본 슬롯이 다시 렌더링됩니다. 먼저 오류가 완전히 해결되었는지 확인해야 합니다. 그렇지 않으면 오류 슬롯이 두 번째로 렌더링됩니다.)

다른 경로로 이동하면 오류가 자동으로 지워집니다.



### 예

페이지/index.vue

```vue
<!-- pages/index.vue -->

<template>
  <!-- some content -->
  <NuxtErrorBoundary @error="someErrorLogger">
    <!-- You use the default slot to render your content -->
    <template #error="{ error, clearError }">
      You can display the error locally here: {{ error }}
      <button @click="clearError">
        This will clear the error.
      </button>
    </template>
  </NuxtErrorBoundary>
</template>
```



[Docs > Examples > Advanced > Error Handling](https://nuxt.com/docs/examples/advanced/error-handling) 에서 라이브 예제를 읽고 편집합니다 .



http://guide.ustraframework.kro.kr/ref-doc/11/4slecgOLokp19TOOa48j
