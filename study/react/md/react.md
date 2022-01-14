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

![image-20211230144314440](.\image\image-20211230144314440.png)

	[react-app 구조]
	├─ node_modules
	├─ public
	│      favicon.ico
	│      index.html
	│      logo192.png
	│      logo512.png
	│      manifest.json
	│      robots.txt
	└─ src
		├─ components
		│      Control.js
		│      Counter.js
		│      CreateContent.js
		│      ReadContent.js
		│      Subject.js
		│      Timer.js
		│      TOC.js
		│      UpdateContent.js
		│  App.css
		│  App.js
		│  App.test.js
		│  index.css
		│  index.js
		│  logo.svg
		│  reportWebVitals.js
		│  setupTests.js



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

1. 컴포넌트 생성 위치 (임의의 디렉토리에 컴포넌트 모음)
   /src/components/

2. 컴포넌트 선언

   ```react
   import React, {Component} from 'react';
   import Subject from './components/Subject'
   import './App.css';
   
   class App extends Component {
     render() {
       return (
         <header>
           <h1>리액트 예제</h1>
           <Subject></Subject>
           <p>내용</p>
         </header>
       );	
     }
   }
   export default App;
   ```

   - import React, {Component} from 'react';

     - React 공통 import https://ko.reactjs.org/docs/react-api.html
     - npm 과 ES6 인 경우 `import React from 'react'`
     - npm 과 ES5 인 경우 `var React = require('react')` 

   - import Subject from './components/**Subject**'

     - Subject 컴포넌트 import
     - Subject.js 에서 확장자명이 생략 가능

   - class **App** extends **Component** {}

     - App : 컴포넌트 명칭 (첫 문자는 **대문자**가 원칙)
     - extends Component : Component 를 상속

   - render() {  }

     - 화면에 표시할 내용 앨리먼트로 **return (앨리먼트 or 문자)**
       - `return <div>Count : {this.state.count}</div>;`
       - `return this.state.count;`  <= 앨리먼트 없이 단독인 경우 중괄호 제거
       - `return 'Count';` <= 문자열이므로 따옴표 필요
     - return 하는 **최상위 요소는 1개만 허용**
     - https://ko.reactjs.org/docs/react-component.html#render

   -  \<h1\>리액트 예제\<h1\>

     - **JSX** 문법으로 **React 엘리먼트**를 생성
     - JSX 는 Javascript 를 확장한 문법으로 Javascript 모든 기능 포함
     - html 형태와 유사하지만 다르다. (class => className, textarea 내용 value)
     - **소문자**로 시작하는 태그는 DOM 태그로 인식하고 처리
     - https://ko.reactjs.org/docs/introducing-jsx.html

   - \<Subject\>\</Subject\>

     - **import** 된 사용자 정의 컴포넌트를 렌더링(합성)

   - export default App;

     - App 컴포넌트를 추출

       
       
       

## props 와 state

1. props

   - **읽기 전용**
   - Component 의 속성
   - 상위 Component 에서 하위 Component 로 **데이터 전달**
   - 이벤트 함수 선언으로 **다른 Component 와 소통**

2. state

   - 각 클래스마다 가지는 **데이터 저장소**
   - **수정 가능**
   - 수정할 땐 **반드시 setState()** 함수 사용

   ```react
   /* App.js */
   <Subject title={this.state.subject.title} sub={this.state.subject.sub}
       onChangePage={function() {
           this.setState({mode: 'welcome'});
       }.bind(this)}
       ></Subject>
   
   import React, {Component} from 'react';
   
   class Subject extends Component {
       render () {
         return (
           <header>
             <h1><a href='/' onClick={
               function(e) {
                 e.preventDefault();
                 this.props.onChangePage();
               }.bind(this)}>{this.props.title} (React)</a>
             </h1>
             {this.props.sub}
           </header>
         );
       }
   }
   
   export default Subject;
   ```

   

3. 

## CRUD





끝
