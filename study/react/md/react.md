# REACT

React 정리 

[TOC]

## React 시작하기

1. React 공식사이트 [react.org](https://reactjs.org/)

2. React 앱 [생성하기](https://reactjs.org/docs/create-a-new-react-app.html)

3. npm 설치하기 [https://nodejs.org/ko/](https://nodejs.org/ko/)

   - Node 14.0.0 버전 이상 
   - npm 5.6 버전 이상

   ```shell
   npm -v
   node -v
   ```

4. React 앱 생성하기 (Windows)

   ```shell
   npm install -g create-react-app
   cd C:\Users\사용자이름\Desktop\
   mkdir react-app
   cd react-app
   create-react-app . 
   ```

5. 해당 위치에 App 생성  >> C:\Users\사용자이름\Desktop\react-app\

![image-20211230144314440](..\image\image-20211230144314440.png)

​		[react-app 구조]



## React 실행

1. React 구동 (개발환경)

   - windows cmd 창이나 Visual Studio Code 터미널에서 실행

   ```shell
   npm run start
   ```

2. 빌드 (배포)

   ```shell
   npm run build
   serve -s build
   npm install -g serve
   (npx serve -s build)
   ```

   

## React 프로젝트 구조

1. public 디렉토리

   - index.html
     - 기본 HTML 페이지

2. src 디렉토리

   - index.js

     - 컴포넌트를 생성하고 index.html 에 컴포넌트를 import 한다. import 대상은 **App.js** 에 구현된다.

     - import 할때 확장자명을 생략하므로 이름 중복이 되지 않도록 한다. (App.js, App.css) x

       ```react
       import React from 'react';
       import ReactDOM from 'react-dom';
       import './index.css';
       import App from './App';
       import reportWebVitals from './reportWebVitals';
       
       ReactDOM.render(
        <React.StrictMode>
         <App />
        </React.StrictMode>,
        document.getElementById('root')
       );
       
       // If you want to start measuring performance in your app, pass a function
       // to log results (for example: reportWebVitals(console.log))
       // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
       reportWebVitals();
       ```

       

   - App.js

     - **Component** 를 상속(extends) 받아서 **App** class 를 구현한다.

     - <u>App.js 변경시 화면 자동 reload</u>

     - 함수 형식

       ```react
       import React from 'react';
       import './App.css';
       
       function App() {
        return (
         <div className="App">
          Hi
         </div>
        );
       }
       
       export default App;
       ```

     - 클래스 형식

       ```react
       import React, { Component } from 'react';
       import './App.css';
       
       class App extends Component {
        render() {
         return (
           <div className="App">
            Hi
           </div>
         );
        }
       }
       
       export default App;
       ```

       

   

## 컴포넌트 생성

1. 컴포넌트 생성 위치



