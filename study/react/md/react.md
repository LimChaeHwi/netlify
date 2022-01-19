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
	│      manifest.json
	├─ src
	│	├─ components
	│   │      Control.js
	│   │      Counter.js
	│   │      CreateContent.js
	│   │      ReadContent.js
	│   │      Subject.js
	│   │      Timer.js
	│   │      TOC.js
	│   │      UpdateContent.js
	│   │  App.css
	│   │  App.js
	│   │  index.css
	│   │  index.js
	│ package-lock.json
	│ package.json



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

   


## JSX

1. JSX 란 

   ```react
   const element = <h1>Hello, world!</h1>;
   ```

   - Javascript 를 확장한 React 앨리먼트를 생성하는 문법입니다.

2. JSX 없이 사용하기

   ```react
   /* JSX 사용 */
   //  "좋아요" <button>을 표시
   return (
     <button onClick={() => this.setState({ liked: true })}>
       Like
     </button>
   );
   ```

   ```react
   /* JSX 미사용 */
   const e = React.createElement;
   
   // "좋아요" <button>을 표시
   return e(
     'button',
     { onClick: () => this.setState({ liked: true }) },
     'Like'
   );
   ```

3. 프로젝트에 JSX 추가하기 (새 React 앱인 경우 제외)

   PC 에 Node.js 설치 필요! (wjscjflrl)

   - **1단계:** `npm init -y` 를 실행하세요.
   - **2단계:** `npm install babel-cli@6 babel-preset-react-app@3`를 실행

4. JSX 전처리기 실행하기

   src 폴더를 만들고 터미널 명령어 실행

   ```
   npx babel --watch src --out-dir . --presets react-app/prod
   ```

   

## 컴포넌트 생성

1. 컴포넌트 생성 위치 (임의의 디렉토리에 컴포넌트 모음)
   /src/components/

2. 샘플코드

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

   - `import React, {Component} from 'react';`

     - React 공통 import https://ko.reactjs.org/docs/react-api.html
     - npm 과 ES6 인 경우 `import React from 'react'`
     - npm 과 ES5 인 경우 `var React = require('react')` 

   - `import Subject from './components/**Subject**'`

     - Subject 컴포넌트 import
     - Subject.js 에서 확장자명 생략 가능 ('Subject.js' == 'Subject')

   - `class **App** extends **Component** {}`

     - App : 컴포넌트 명칭 (첫 문자는 **대문자**가 원칙)
     - extends Component : Component 를 상속

   - `render() {  }`

     - 화면에 표시할 내용 앨리먼트로 **return (앨리먼트 or 문자)**
       - `return <div>Count : {this.state.count}</div>;`
       - `return this.state.count;`  <= 앨리먼트 없이 단독인 경우 중괄호 제거
       - `return 'Count';` <= 문자열이므로 따옴표 필요
     - return 하는 **최상위 요소는 1개만 허용**
     - https://ko.reactjs.org/docs/react-component.html#render

   -  `<h1>리액트 예제<h1>`

     - **JSX** 문법으로 **React 엘리먼트**를 생성
     - JSX 는 Javascript 를 확장한 문법으로 Javascript 모든 기능 포함
     - html 형태와 유사하지만 다르다. (class => className, textarea 내용 value)
     - **소문자**로 시작하는 태그는 DOM 태그로 인식하고 처리
     - https://ko.reactjs.org/docs/introducing-jsx.html

   - `<Subject><Subject>`

     - **import** 된 사용자 정의 컴포넌트를 렌더링(합성)

   - `export default App;`

     - App 컴포넌트 export

       
       

## props 와 state

1. props

   - Component 의 **속성**
   - **읽기 전용** (ReadOnly)
   - 상위 Component 에서 하위 Component 로 **데이터 전달**
   - 이벤트 함수 선언으로 **다른 Component 와 소통**
   - 속성명 대소문자 구분 (ex : title != Title)
   - 정의 :: **속성명 = {속성값}** or 속성명='속성값(고정)' 
   - 사용 :: **this.props.속성명**
   - constructor 함수에서 상속 받음

2. state

   - 각 클래스마다 가지는 **데이터 저장소**
   - **수정 가능** (Updatable)
   - 수정할 땐 **반드시 setState()** 함수 사용
- 정의 :: **this.state** = {Name1 : 값, Name2: 값}
   - 사용 :: **this.state.Name1**
   - constructor 에서 선언
   
3. 샘플코드

   ```react
   /* App.js */
   /* --- 생략 --- */
   <Subject title={this.state.subject.title} sub={this.state.subject.sub}
       onChangePage={function() {
           this.setState({mode: 'welcome'});
       }.bind(this)}>
   </Subject>
   ```

   ```react
   /* Subject.js */
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

   

   - \<Subject title={this.state.subject.title} sub={this.state.subject.sub}

     - Subject **컴포넌트 추출**
     - title, sub 속성(props) 정의

   - onChangePage={function() {

     - onChangePage **이벤트 추가**
     - 해당 컴포넌트 내에서 호출해서 사용

   - this.setState({mode: 'welcome'});

     - this.state.mode 의 값을 'welcome' 으로 **변경**

   - }.bind(this)}>

     - function 내부에서 현재 컴포넌트 App.js 접근을 위해 **.bind(this) 사용**

       `this.setState({mode: 'welcome'});`

   - \<h1><a href='/' onClick={

     - a 태그에 onClick 이벤트 함수 등록
     - HTML :: **onclick**, JSX :: **onClick** (카멜케이스 방식)

   - function(e) {

     - 이벤트 함수 선언

   - e.preventDefault();

     - 해당 태그의 기본 동작 해제 (ex : a 태그 클릭시 페이지 이동 불가)

   - this.props.onChangePage();

     - 추출된 곳에서 선언된 onChangePage 이벤트를 호출

   

## CRUD

1. Control (화면 전환)

   ```react
   /* App.js */
   /* --- 생략 --- */
   getContent() {
     var _article, _contents, _contentData = null;
   
     if(this.state.mode === 'welcome') {
       var _title = this.state.welcome.title;
       var _desc = this.state.welcome.desc;
       _article = <ReadContent data={{title:_title, desc:_desc}}></ReadContent>;
   
     } else if (this.state.mode === 'read') {
       _contentData = this.getReadContent();
       _article = <ReadContent data={_contentData}></ReadContent>;
   
     } else if (this.state.mode === 'create') {
       _article = <CreateContent onSubmit={
         function(_title, _desc) {
           this.max_content_id = this.max_content_id + 1;
           //  Object.assign({}, 객체) : 객체의 경우, Array.from(배열) : 배열의 경우
           _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc: _desc});
           this.setState({
             contents: _contents,
             mode: 'read',
             selected_content_id: this.max_content_id
           });
         }.bind(this)}></CreateContent>;
   
     } else if (this.state.mode === 'update') {
       _contentData = this.getReadContent();
       _article = <UpdateContent data={_contentData} onSubmit={
         function(_id, _title, _desc) {         
           var _contents = Array.from(this.state.contents);
           var i = 0;
           while (i < _contents.length) {
             if (_contents[i].id === _id) {
               _contents[i] = {id:_id, title:_title, desc:_desc};
               break;
             }
             i = i +1;
           }
           this.setState({
             contents: _contents,
             mode: 'read',
             selected_content_id: Number(_id)
           });
         }.bind(this)}>
         </UpdateContent>;
     }
   
     return _article;
   }
   
   render() {
   	return (
   	  <div>
   		<Control onChangeMode={
   		  function(_mode) {
   			if (_mode === 'delete') {
   			  /* Delete Process */
   			} else {
   				this.setState({
   				  mode: _mode
   			  });
   			}
   		  }.bind(this)}>
   		</Control>
   		{this.getContent()}
   	  </div>
   	);
   }
   ```

   ```react
   /* Control.js */
   import React, {Component} from 'react';
   
   class Control extends Component {
       render () {
         return (
           <ul>
             <li><a href="/create" onClick={
               function(e) {
                 e.preventDefault();
                 this.props.onChangeMode("create");
               }.bind(this)}>create</a>
             </li>
             <li><a href="/update" onClick={
               function(e) {
                 e.preventDefault();
                 this.props.onChangeMode("update");
               }.bind(this)}>update</a>
             </li>
             <li><input onClick={
               function(e) {
                 e.preventDefault();
                 this.props.onChangeMode("delete");
               }.bind(this)} 
               type="button" value="delete"></input>
             </li>
           </ul>
         );
       }
   }
   
   export default Control;
   ```

   

2. Create (추가 화면)

   ```react
   import React, {Component} from 'react';
   
   class CreateContent extends Component {
       render () {
         return (
           <article>
             <h2>Create Content</h2>
             <form action="/create_process" method="post" onSubmit={
               function(e) {
                   e.preventDefault();
                   alert("submit!");
                   this.props.onSubmit(e.target.title.value, e.target.desc.value);
               }.bind(this)}>
               <p><input type='text' name='title' placeholder='title'></input></p>
               <p>
                   <textarea name='desc' placeholder='description'></textarea>
               </p>
               <p>
                   <input type='submit'></input>
               </p>
             </form>
           </article>
         );
       }
   }
   
   export default CreateContent;
   ```

   

3. Update (수정 화면)

   ```react
   import React, {Component} from 'react';
   
   class UpdateContent extends Component {
       
     constructor(props) {
       super(props);
       this.state = {
         id : this.props.data.id,
         title : this.props.data.title,
         desc : this.props.data.desc
       }
     }
     
     inputFormHandler(e) {
       this.setState({[e.target.name] : e.target.value});
     }
   
     render () {
       return (
         <article>
           <h2>Update Content</h2>
           <form action="/update_process" method="post" onSubmit={
             function(e) {
               e.preventDefault();
               alert("submit! "+this.state.id);
               this.props.onSubmit(
                   this.state.id,
                   this.state.title, 
                   this.state.desc);
             }.bind(this)}
           >
               <p>
                 <input type="hidden" name="id" value={this.state.id}></input>
               </p>
               <p>
                 <input 
                   type='text' 
                   name='title' 
                   placeholder='title'
                   value={this.state.title}
                   onChange={this.inputFormHandler.bind(this)}
                 ></input>
               </p>
               <p>
                 <textarea name='desc' placeholder='description' value={this.state.desc}
                   onChange={this.inputFormHandler.bind(this)}
                 ></textarea>
               </p>
               <p>
                 <input type='submit'></input>
               </p>
           </form>
         </article>
       );
     }
   }
   
   export default UpdateContent;
   ```

   

4. Delete (삭제 처리)

   ```react
   if (window.confirm('really?')) {
     var _contents = Array.from(this.state.contents);
     var i = 0;
     console.log(this.state.selected_content_id);
     
     while (i < this.state.contents.length) {
       if (_contents[i].id === this.state.selected_content_id) {
     	  _contents.splice(i, 1);
     	  break;
       }
       i = i+1;
     }
     
     this.setState({
       mode: 'welcome',
       contents: _contents
     });
     alert('deleted');
   }
   ```

   

## 자주 사용되는 생명주기 메서드

[공식문서](https://ko.reactjs.org/docs/react-component.html#commonly-used-lifecycle-methods)

### 생명주기

![image-20220119161825300](.\image\image-20220119161825300.png)

### render()

- 클래스 컴포넌트에서 반드시 구현되어야 하는 유일한 메서드
- 반환 대상 (return)
  - React 엘리먼트
  - 배열과 Fragment
  - Portal (부모 컴포넌트 밖 DOM 노드로 렌더링)
  - 문자열과 숫자
  - Boolean 또는 null

### construct()

- super(props) 를 통해 this.props 정의 -> 미사용시 버그
- state 초기화

### componentDidMount()

- 컴포넌트가 마운트된 직후 호출
- 외부 데이터 불러오기

### componentDidUpdate()

- 컴포넌트 갱신시 호출
- props 변경 됐을때 사용

### componentWillUnmount()

- 컴포넌트가 마운트 해제되어 제거되기 직전에 호출

- 타이머제거

- 네트워크 요청 취소

- setState() 호출 불가

  

끝