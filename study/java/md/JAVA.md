# JAVA

Java 정리

[TOC]

## 메모리 사용 영역

`JVM` 은 시작되고 운영체제로부터 할당 받은 메모리 영역을 세분화(`Method영역`, `Heap영역`, `Stack영역`)하여 사용한다.



- **Method 영역**

메소드 영역에는 코드에서 사용되는 클래스 (~.class) 들을 클래스 로더로 읽어 `클래스`별로 `런타임 상수풀`, `필드데이터`, `메소드데이터`, `메소드코드`, `생성자코드` 등을 분류하여 저장한다. 메소드영역은 JVM 이 시작할 때 생성되고 <u>모든 스레드가 공유</u>한다.



- **Heap 영역**

힙 영역은 `객체`와 `배열`이 생성되는 영역이다. 힙 영역에 생성된 객체와 배열은 JVM 스택 영역의 변수나 다른 객체의 필드에서 참조한다.



- **Stack 영역**

스택 영역은 각 `스레드`마다 하나씩 존재하며 스레드가 시작될 때 할당된다.

스택은 메소드를 호출할 때마다 프레임(Frame)을 추가(Push) 하고 메소드가 종료되면 해당 프레임을 제거(Pop) 한다.

프레임 내부에는 로컬 변수 스택이 있는데, `기본 타입 변수`와 `참조 타입 변수`가 추가(push) 되거나 제거(pop) 된다.

기본 타입 변수는 스택 영역에 직접 값을 가지고 있지만, 참조 타입 변수는 값이 아니라 힙 영역이나 메소드 영역의 객체 주소를 가진다.



## 정적 멤버와 static

정적 멤버 선언시 `static` 키워드를 추가로 붙이면 된다.

`정적 필드`와 `정적 메소드`는 클래스에 고정된 멤버이므로 클래스 로더가 클래스(바이트코드)를 로딩해서 메소드 메모리 영역에 적재할 때 <u>클래스별로 관리</u>된다. 클래스 로딩이 끝나면 바로 사용할 수 있다.

객체마다 가지고 있어야 할 데이터라면 인스턴스 필드로 선언하고 공용데이터라면 정적 필드로 선언하는 것이 좋다.

- **단점**

  정적 메소드과 정적 블록 내에서는 객체가 없어도 실행이 가능하기 때문에 <u>인스턴스 필드나 인스턴스 메소드 사용이 불가능하다</u>. 객체 자신을 참조하는 this 키워드도 사용이 불가능하다.

- **싱글톤**

  프로그램 전체에서 단 하나의 객체만 만들도록 보장된 객체를 싱글톤이라고 한다.

  ```java
  public class 클래스 {
  	// 정적 필드 : new 로 클래스 생성 불가
  	private static 클래스 singleton = new 클래스();
  
  	// 생성자 : private 으로 외부에서 호출 불가
  	private 클래스() {}
  
  	// 정적 메소드 : getInstance 로만 객체 사용가능
  	static 클래스 getInstance() {
  		return singleton;
  	}
  }
  ```

  

## 어노테이션

어노테이션은 메타데이터(metadata)라고 볼 수 있다. 메타데이터란 애플리케이션이 처리해야 할 데이터가 아니라, 컴파일 과정과 실행과정에서 코드를 어떻게 컴파일하고 처리할 것인지를 알려주는 정보이다.



- **어노테이션의 용도**
  - 컴파일러에게 코드 문법 에러를 체크하도록 정보를 제공
  - 소프트웨어 개발툴이 빌드나 배치시 코드를 자동으로 생성할 수 있도록 정보를 제공
  - 실행시 특정 기능을 실행하도록 정보를 제공



- **어노테이션 정의 와 사용**

  인터페이스 정의와 유사하다.

  ```java
  //	정의
  public @interface AnnotationName {
  }
  ```

  ```java
  //	사용
  @AnnotationName
  ```

  

  어노테이션은 엘리먼트를 멤버로 가질 수 있다. 각 앨리먼트는 타입과 이름으로 구성되며, 디폴트 값을 가질 수 있다.

  ```java
  public @interface 어노테이션이름 {
  	// 타입 elementName() [default 값];
  	String elementName() default "이름";
  }
  ```

  

  어노테이션이 적용될 대상을 지정할 때에는 @Target 어노테이션을 사용한다.

  ```java
  @Target({ElementType.TYPE, ElementType.FIELD, ElementType.METHOD})
  public @interface AnnotationName {}
  
  @AnnotationName
  public class ClassName {
      @AnnotationName
      private String fieldName;
      //@AnnotationName (x)  --- @Target에 CONSTRUCT가 없어 생성자는 적용못함
      public ClassName() {}
      
      @AnnotationName
      public void methodName() {}
  }
  ```

  

- 어노테이션 유지 정책

  어노테이션을 어느 범위까지 유지할 것인지 지정해야 한다.

  | RententionPolicy | 설명                                                         |
  | ---------------- | ------------------------------------------------------------ |
  | SOURCE           | 소스상에서만 어노테이션 정보를 유지한다. 소스코드를 분석할 때만 의미가 있으며, 바이트코드 파일에는 정보가 남지 않는다. |
  | CLASS            | 바이트코드 파일까지 어노테이션 정보를 유지한다. 하지만 리플렉션을 이용해서 어노테이션 정보를 얻을 수 없다. |
  | RUNTIME          | 바이트코드 파일까지 어노테이션 정보를 유지하면서 리플렉션을 이용해서 런타임 시에 어노테이션 정보를 얻을 수 있다. |

  ```java
  @Target({ElementType.TYPE, ElementType.FIELD, ElementType.METHOD})
  @Retention(RetentionPolicy.RUNTIME)
  public @interface AnnotationName {}
  ```

  



