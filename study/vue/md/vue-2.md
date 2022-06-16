# Vue 2 설정

ojt-project 를 진행하면서 vue 관련해서 초기 설정한 내용 정리 (2022-04)

[TOC]

## Vue 환경설정 ( vue 2.6.14 기준 )

### Node.js 설치

- URL : https://nodejs.org/ko/

- 버전 : 16.14.2 LTS

- [다운로드]

  

### Vue 설치

- 참고 https://kr.vuejs.org/v2/guide/index.html

- Command.exe 실행

  ```bash
  $ npm install vue ( vue 설치 )
  $ npm install -g @vue/cli ( vue-cli 설치 )
  $ vue -V ( vue-cli 버전 확인 )
  @vue/cli 5.0.4
  ```

  

### Vue 프로젝트 생성

```bash
$ cd C:\[프로젝트 경로] ( 설치할 경로로 이동 )
$ vue create [project-name] ( vue 프로젝트 생성 )
   (vue/cli 3.0 이상부터는 의존 모듈도 함께 설치됨)
```



### VSCode 설치

- Front-End 개발용

- URL : https://code.visualstudio.com/

  

### node_modules 설치

- package.json 파일의 dependencies 에 있는 모듈 전체 install

  ```bash
  $ npm install
  ```

  

#### vue router 설치

- Vue 화면 전환

  ```bash
  $ npm i vue-router@3.5.1 -S
  ```

- router/index.js

  ```json
  import Vue from "vue";
  import VueRouter from "vue-router";
  import MainPage from "@/views/MainPage";	// 컴포넌트 import
  Vue.use(VueRouter);
  
  const routes = [
   {
    path: "/",
    name: "MainPage",
    component: MainPage,
   },
  ];
  
  /* 화면 전환시 스크롤 위치 */
  const router = new VueRouter({
   mode: "history",
   routes,
   scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
     return savedPosition
    } else {
     return {x:0, y:0}
    }
   }
  });
  export default router;
  ```

  

#### vuetify 추가

- 디자인 템플릿
- 참고 https://vuetifyjs.com/en/getting-started/installation/

```bash
cd C:/[Vue 프로젝트 디렉토리]
$ vue add vuetify
Default (recommended)
```



#### editorconfig 플러그인 설치

- 마켓플레이스에서 editorconfig 검색 후 설치

  

#### editorconfig 설정 파일

- .editorconfig 파일

  ```properties
  [*.{js,jsx,ts,tsx,vue,scss,sass}]
  indent_style = space  
  indent_size = 2 들여쓰기 space 두 칸
  trim_trailing_whitespace = true 문자 앞에 공백 제거
  insert_final_newline = true 파일의 끝은 새로운 줄로 끝냄
  ```

  

#### eslint-plugin-vuetify 설치

```bash
$ npm install eslint-plugin-vuetify --save-dev
```



#### eslint 플러그인 설치

- 마켓플레이스에서 eslint 검색 후 설치

- .eslintrc.js (eslint 설정 파일)

  ```js
  // .eslintrc.js
  module.exports = {
    extends: [
      'plugin:vue/recommended'
    ],
    plugins: [
      'vuetify'
    ],
    rules: {
      'vuetify/no-deprecated-classes': 'error'
    },
  }
  ```

  

#### axios 설치

- API 통신
- 참고 https://axios-http.com/kr/docs/intro

```bash
$ npm install axios
```



#### axios 설정

- main.js (공통에 셋팅)

```js
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8081';
```



#### vuex 설치

- Vuex 의 Store 를 사용하여 상태관리
- 브라우저의 Local Storage, Session Storage 사용
- vue2 기준으로 vuex 3 버전 설치

```bash
$ npm install vuex@3
```



#### vuex –persistence 설치

- vuex 의 영구적 사용
- 참고 https://www.incodom.kr/VueJS/Vuex

```bash
$ npm install --save vuex-persistedstate
```



### frontend 프로젝트 구성

> **frontend**
>  ├─**node_modules**   npm install 명령어를 통한 외부 패키지들이 저장 장소
>  ├─**public**  웹팩에 처리를 받지 않고 publishing 되는 정적 파일 저장 장소
>  └─**src**
>     ├─**assets**  css, image 와 같은 정적 자산 저장 장소
>     ├─**components**  vue 컴포넌트 저장 장소
>     ├─**plugins**  vue 플러그인 패키지 저장 장소
>     ├─**router**  vue router 매핑정보 저장 장소
>     ├─**views**  vue router 에 매핑된 페이지 저장 장소
>     ├─**App.vue**  vue 의 최상위 컴포넌트
>     └─**main.js**  가장 먼저 실행되는 스크립트 파일로 vue 인스턴스를 생성



### Chrome 브라우저 vue devtools 설치

https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd





### 그 외

> vue-chartjs
>
> vue-chat-scroll
>
> vue-cookies
>
> vue-meta
>
> vue-router
>
> vue2-daterange-picker
>
> vue2-editor



### Tip

