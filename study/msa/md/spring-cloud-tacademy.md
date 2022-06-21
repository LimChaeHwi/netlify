# Spring Cloud MSA 기초

(T아카데미) Spring Cloud 를 활용한 MSA 기초 강의 내용 정리 (2022-06)

참고 https://www.youtube.com/watch?v=D6drzNZWs-Y&list=PL9mhQYIlKEhdtYdxxZ6hZeb0va2Gm17A5



[TOC]

## 모놀리틱 아키텍쳐

- **장점**
  - 개발이 단순 (repository 체크아웃)
  - 배포가 단순 (war)
  - Scale-out 단순 (서버 복사)
  - DB 성능으로 인한 한계가 있음

- **단점**
  - 무겁다 - IDE 가 힘듦
  - 어플리케이션 시작이 오래 걸림
  - 기술 스택 바꾸기가 어려움
  - 높은 결합도
  - 코드베이스의 책임 한계와 소유권이 불투명
  - 전체 다 파악하기도 쉽지 않아서 share.jar 같은 서비스 공유지점이 필요한데 점점 무거워짐



## MSA

- 각 서비스 간 Network 를 통해 소통 (HTTP, ...)

- **독립된 배포** 단위

- 각 서비스는 쉽게 교체 가능

- 각 서비스는 **기능 중심**으로 구성

- 각 서비스에 적합한 프로그래밍 언어, 데이터베이스 로 구성

- 서비스는 크기가 작고, 상황에 따라 경계를 정하고 자율적으로 개발되고 독립적으로 배포되고 분산되고 자동화된 프로세스로 구축되고 배포됨

- 마이크로 서비스는 한 팀에 의해 개발할 수 있는 크기가 절대적으로 **3~9명**의 사람들이 스스로 더 많은 개발을 할 수 없을 정도로 커지면 안된다

  

### 프로젝트 import

1. 예제 프로젝트 clone 

   ```bash
   git clone https://github.com/Gunju-Ko/spring-cloud-workshop.git  
   ```

2. clone 한 directory 로 이동  

   ```bash
   cd spring-cloud-workshop  
   ```

3. 실습 시작 시점으로 git 이동  

   ```bash
   git checkout tags/step-0  
   ```

4. IntelliJ에서 **build.gradle** import 



### API 동작 확인

- Display / Product 실행 

  - Product 동작 확인 : http://localhost:8082/products/22222

  - Display 동작 확인 :http://localhost:8081/displays/11111

- **Display API 내부에서 Product API 를 RestTemplate 으로 호출해서 사용하는 방식으로 구성!!**



## Cloud Native

- 클라우드 네이티브의 핵심은 애플리케이션을 어떻게 만들고 배포하는지에 있으며 위치는 중요하지 않다.

- 클라우드 서비스를 활용한다는 것은 컨테이너와 같이 민첩하고 확장 가능한 구성 요소를 사용해서 재사용 가능한 개별적인 기능을 제공하는 것을 의미한다.



### Twelve Factors 

**유익한 애플리케이션 개발 원칙**

1. 코드베이스
  - 버전 관리되는 하나의 코드베이스가 여러번 배포된다
  - 코드베이스와 앱 사이에는 항상 1대1관계가 성립된다
2. 의존성
  - 애플리케이션의 의존관계는 명시적으로 선언되어야 한다.
  - 의존관계 관리 도구를 써서 라이브러리 저장소에서 내려받을 수 있어야한다.
3. 설정
  - 설정 정보는 실행환경에 저장
4. 백엔드(지원) 서비스
  - 지원서비스(backing service) 는 필요에 따라 추가되는 자원으로 취급
  - 지원서비스는 데이터베이스, API기반 Restful 웹서비스, SMTP 서버, FTP 서버
  - 지원서비스는 애플리케이션의 자원으로 간주
  - 테스트 환경에서 사용하던 임베디드 sql 을 스테이징 환경에서 mysql 로 교체 가능해야한다
5. 빌드, 릴리즈, 실행
  - 철저하게 분리된 빌드와 실행 단계
  - 코드베이스는 3단계를 거쳐 (개발용이 아닌) 배포로 변환
  - 빌드 단계 : 소스코드를 가져와 컴파일 후 하나의 패키지를 만듦
  - 릴리스 단계 : 빌드에 환경설정 정보를 조합한다. 릴리스 버전은 실행환경에서 운영될 수 있는 준비가 완료되어 있다.
  - 실행 단계 : 보통 런타임이라 불림. 릴리스 버전 중 하나를 선택해 실행 환경 위에 애플리케이션 실행
6. 무상태 프로세스
  - 애플리케이션을 하나 혹은 여러개의 무상태 프로세스로 실행. 상태는 외부저장소에 보관.
7. 포트 바인딩
  - 서비스는 포트에 연결해서 외부에 공개
  - 실행환경에 웹서버를 따로 추가해줄 필요 없이 스스로 웹서버를 포함하고 있어서 완전히 자기 완비적이다. 
8. 동시성
  - 프로세스 모델을 통해 수평적으로 확장한다
  - 애플리케이션은 필요할 때마다 프로세스나 스레드를 수평적으로확장해서 병렬로 실행할 수 있어야한다.
  - 장시간 소요되는 데이터 프로세싱 작업은 스레드풀에 할당해서 스레드 실행기를 통해 수행되어야 한다.
  - 예를 들어, HTTP 요청은 서블릿 쓰레드가 처리하고, 시간이 오래걸리는 작업은 워커 쓰레드가 처리해야한다
9. 처분성(폐기가능)
  - 빠른 시작과 그레이스풀 셧다운을 통한 안정성 극대화
  - 짧은 시간안에 시작되어야 함
10. dev/prod 일치
  - 시간 차이 : 개발자는 변경 사항을 운영환경에 빨리 배포해야한다.
  - 개인 차이 : 코드 변경을 맡은 개발자는 운영 환경으로의 배포 작업까지 할 수 있어야 하고, 모니터링도 할 수 있어야 한다.
  - 도구 차이 : 각 실행 환경에 사용된 기술이나 프레임워크는 동일하게 구성되어야 한다.
  - L4 의 설정이 상용에서만 사용되기 때문에 일치가 어려운 점은 있다.

10. 로그
- 로그는 이벤트 스트림으로 취급
- 로그를 stdout 에 남긴다
- 애플리케이션은 로그 파일 저장에 관여하지 말아야 한다
- 로그 집계와 저장은 애플리케이션이 아니라 실행 환경에 의해 처리되어야 한다

11. Admin 프로세스
- admin/maintenance 작업을 일회성 프로세스로 실행
- 실행되는 프로세스와 동일한 환경에서 실행
- admin 코드는 애플리케이션 코드와 함께 배포되어야 한다



## Netflix OSS, Spring Cloud



### Circuit Breaker - Hystrix

**Failure as a First Class Citizen**

- 분산 시스템에서는 실패가 일반적인 표준이다.
- 톰캣서버의 기본설정
  - Servlet Thread 기본 값은 200개
  - Timeout 무한대 (한번 요청이 들어와서 끝날 때까지 붙잡고 있음)



**Hystrix 란**

- 메소드 호출을 **Intercept** 하여 대신 실행
- 실행된 결과의 성공/실패(Exception) 여부를 기록하고 '통계'를 냄
- 실행 결과 '통계'에 따라 **Circuit Open** 여부를 판단하고 필요한 '조치'를 취함
- **Circuit Open** - 주어진 시간동안 호출이 제한되며 즉시 **에러**를 반환
- 특정 메소드에서 지연이 시스템 전체의 Resource 를 모두 소모하여 시스템 전체의 장애를 유발하기 때문에 조기에 차단(Fail Fast) 하는 방식으로 보호함
- 기본설정 10초동안 20개 이상의 호출이 발생했을때 50% 이상의 호출에서 에러가 발생하면 Circuit Open
- 응답시간 기본 설정 <u>default 1000ms</u>



**Hystrix 사용하기**

- **배경**
  - Display 서비스는  외부 Server 인 Product API 와 연동되어 있음-
  - Product API 에 장애가 나더라도 Display 의 다른 서비스는 이상없이 동작
  - Product API 에 응답 오류인 경우, Default 값을 넣어 줌

- **결정 내용**

  - Display -> Product 연동 구간에 Circuit Breaker 적용

    

**Hystrix 설정**

1. [display]  **build.gradle**에 **hystrix dependency** 추가

  ```bash
  compile('org.springframework.cloud:spring-cloud-starter-netflix-hystrix')
  ```

2. [display] DisplayApplication.java 에 `@EnableCircuitBreaker` 추가

  - Application 에 `@EnableCircuitBreaker` 설정

  ```java
  @EnableCircuitBreaker
  ```

3. [display] ProductRemoteServiceImpl.java 에 `@HystrixCommand` 추가

  - ServiceImpl 의 메소드에 `@HystrixCommand(fallbackMethod = "getProductInfoFallback")` 설정
  - ServiceImpl 의 메소드에서 RestTemplate 으로 외부 API 호출 후 Exception 이 돌아오면 fallback 실행

  ```java
  @HystrixCommand
  ```

4. [product] ProductController.java 에서 항상 Exception 던지게 수정 (장애 상황)

  - 기존 return 되는 부분 주석

  ```java
  throw new RuntimeException('I/O Error')
  ```

5. [display] ProductRemoteServiceImpl.java 에 **Fallback Method** 작성

   - `@HystrixCommand` 어노테이션의 `fallbackMethod` 로 선언된 값으로 메소드 작성



**정리**

- Hystrix 에서 Fallback 의 실행 여부는 Exception 이 발생했는가 여부
- Fallback 의 정의 여부는 Curcuit Breaker Open 과 무관
- Circuit 은 통계를 따져봐서 오픈 여부 결정

- Throwable 파라미터의 추가로 Fallback 원인을 알 수 있다.



**Hystrix 로 Timeout 처리**

- 지정된 시간안에 반환되지 않으면 자동으로 Exception 발생
  [기본 설정 : 1000ms]
  - 호출되면 서비스에 `Thread.sleep(2000)` 로 Timeout 발생
  - [display] **application.yml** 수정하여 **Hystrix Timeout** 시간 조정
    hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds: 3000



**정리**

- timeout 을 정의하는 것이 중요하다

- Hystrix Circuit Open 테스트
  - [display] **application.yml** 수정하여 Hystrix 프로퍼티 추가
    10 초동안 20개 이상의 호출이 발생했을때 50% 이상의 호출에서 에러가 발생하면 **Circuit Open**



**변경설정**

- h.c.d.circuitBreaker.requestVolumeThreshold:1 (기본값 20개)
- h.c.d.circuitBreaker.errorThresholdPercentage:50



**부가 설명**

- CIrcuit Open 여부는 통계를 기반으로 한다.
- 최근 10초간 호출 통계 (metrics.rollingStats.timeInMilliseconds: 10000 )
- 최소 요청 갯수(20) 넘는 경우만 (circuitBreaker.requestVolumeThreshold: 20 )
- 에러 비율 넘는 경우 (50%) (circuitBreaker.errorThresholdPercentage: 50 )
- 한번 Circuit 이 오픈되면 5초간 호출이 차단되며, 5초 경과 후 단 1개의 호출을 허용하며 (Half-Open), 이것이 성공하면 CIrcuit 을 다시 Close 하고 여전히 실패하면 Open 이 5초 연장된다. (circuitBreaker.sleepWindowInMilliseconds: 5000 )



**Circuit Breaker 의 단위**

- 에러 비율을 통계 단위

- Circuit Open / Close 가 함께 적용되는 단위

- 즉 A메소드가와 B메소드가 같은 Circuit Breaker 를 사용한다면, A 와 B의 에러 비율이 함께 통계 내어지고, Circuit 이 오픈되면 함께 차단

  

**Circuit 의 지정**

- `commandKey` 라는 프로퍼티로 지정 가능

- `@HystrixCommand` 에서는 지정하지 않는 경우 메소드 이름 사용

  - 이렇게 사용하지 말고, 아래와 같이 항상 직접 지정해서 사용 권장 (application.yml)

    ```yaml
    hystrix:
      command:
        productInfo:    # command key. use 'default' for global setting.
    ```

  - 메소드 이름은 겹칠 수 있으며, 나중에 나오는 Feign 의 경우 또 다르기 때문에 헷갈릴 수 있다.



**Hystrix 를 쓴다는 것의 또 다른 의미**

- Hystrix 를 통해 실행한다는 것은 별도의 Thread Pool 에서 내 Code 를 실행한다는 것
- ThreadPool 을 여러개의 Circuit Breaker 가 공유할 수 있다.


**ThreadPool 사용을 통해서 얻을 수 있는 것**

- 내 시스템의 Resource 가 다양한 기능들을 위해 골고루 분배될 수 있도록



### Client LoadBalancer - Ribbon

- Client (API Caller) 에 탑재되는 S/W 모듈
- 주어진 서버 목록에 대해서 Load Balancing 을 수행 
  L4 가 필요없음
- Ribbon 의 장점
  - H/W 가 필요없이 S/W 로만 가능
  - 서버 목록의 동적 변경이 자유로움
  - Load Balancing Schema 마음대로 구성

1. [display] **build.gradle** 에 dependency 추가

  ```yaml
  compile('org.springframework.cloud:spring-cloud-starter-netflix-ribbon')
  ```

2. [display] **DisplayApplicaiton.java** 의 RestTemplate 빈에 `@LoadBalanced` 추가

3. [display] **ProductRemoteServiceImpl.java** 에 주소 제거하고 'product' 로 변경

   - **변경전** : "[http://localhost:8082/products/](http://localhost:8082/products/)"
   - **변경후** : "[http://product/products/](http://product/products/)"

4. [display] **application.yml** 에 ribbon 설정

  ```yaml
  product:
    ribbon:
      listOfServers: localhost:8082
  ```

  

Ribbon 의 Retry 기능
1. [display] build.gradle 에 retry dependency 추가

  ```yaml
  compile('org.springframework.retry:spring-retry:1.2.2.RELEASE')
  ```

  
2. [display] application.yml 에 서버 추가

  ```yaml
  product:
    ribbon:
      listOfServers: localhost:8082, localhost:7777	# Eureka 사용시 제거
      MaxAutoRetries: 0
      MaxAutoRetriesNextServer: 1
  ```

  - **localhost:7777**은 없는 주소라서 Exception 발생. 그러나 **Ribbon Retry** 로 <u>항상 성공</u>



**주의**

- Retry 를 시도하다가 **Hystrix Timeout** 입 발생하면, 즉시 에러 반환
- Retry 를 끄거나, 재시도 횟수를 0으로 하여도 해당 서버로의 호출이 항상 동일한 비율로 실패하지는 않음
- classpath 에 retry 가 존재해야 함

**정리**

- Ribbon 은 여러 Component 에 내장되어 있으며, 이를 통해 **Client Load Balancing** 이 가능
- Ribbon 에는 매우 다양한 설정이 가능(서버 선택, 실패시 Skip 시간, Ping 체크)
- Ribbon 에는 **Retry** 기능 내장
- **Eureka 와 함께 사용될 때 강력함**



### Service Registry - Eureka

- Service Registry
  - 서비스 탐색, 등록
  - 클라우드의 전화번호부
  - (단점) 침투적 방식 코드 변경

- Discovery Client
  - spring-cloud 에서 서비스 레지스트리 사용 부분을 추상화 (Interface)
  - Eureka, Consul, Zookeeper, etcd 등의 구현체가 존재



- Ribbon 이 Eureka 를 통해서 서버 목록을 주기적으로 가져옴

  

**Eureka Server 만들기**

- **Application.java** 에 `@EnableEurekaServer` 설정

**Eureka Client 만들기**

- 호출 대상이 되는 서버 **Application.java** 에 `@EnableEurekaClient` 설정

Eureka Client 만들기 - 다른 서버의 목록 가져오기 (Eureka 에 등록된 서버 목록)

- Controller 에서 

  ```java
  @Autowired
  private DiscoveryClient discoveryClient;
  
  /* 사용 */ this.discoveryClient.getInstances(applicationName);
  ```

- application.yml

  ```yaml
  spring:
    cloud:
      service-registry:
        auto-registration: 
          enabled: false # 현재 인스턴스를 Reigstry 에 등록하지 않고 싶을 때 false
  ```

  

**Eureka in Spring**

- 서버 시작 시 Eureka Server(Registry) 에 자동으로 자신의 상태를 등록(UP)
 
 ```yaml
 eureka.client.register-with-eureka: true(default)
 ```
 
- 주기적 HeartBeat 으로 Eureka Server 에 자신이 살아 있음을 알림
 
 ```yaml
 eureka.instance.lease-renewal-interval-in-seconds: 30(default)
 ```
 
- 서버 종료시 **Eureka Server** 에 자신의 상태 변경(Down) 혹은 자신의 목록 삭제

- Eureka 상에 등록된 이름은 **'spring.application.name'**

   

**Eureka Server 실행**

1. 준비된 Eureka Server 사용
 
  ```bash
  git reset HEAD --hard
  git checkout tags/step-4-baseline -b my-step-4
  ```


2. **build.gradle**
 
  ```yaml
  compile('org.springframework.cloud:spring-cloud-starter-netflix-eureka-server')
  ```
  
    **application.yml** : 데모용 각종 설정
    **Main Class** : `@EnableEurekaServer`

3. 서버 접속 
   [http://localhost:8761/](http://localhost:8761/)

   

**Eureka Client 적용 하기**

1. [product, display] **build.gradle**

   ```yaml
   compile('org.springframework.cloud:spring-cloud-starter-netflix-eureka-client')
   ```

2. [product, display] 

   - ProductApplication.java: `@EnableEurekaClient`
   - DisplayApplication.java: `@EnableEurekaClient`

3. [product, display] **application.yml**

   ```yaml
   eureka:
     instance:
       prefer-ip-address: true  # OS에서 제공하는 hostname 대신 자신의 ip address 를 사용하여 등록
   ```

     

4. Display , Product 서버 실행 후 Eureka 에 나오는지 확인
   http://localhost:8761/ 확인

 

**Eureka 서버 주소 직접 명시**

1. [product/display] application.yml 에 Eureka Server 주소 명시
   default : http://127.0.0.1:8761/erueka



**정리**

- `@EnableEurekaServer` / `@EnableEurekaClient` 를 통해 서버 구축, 클라이언트 Enable 이 가능하다
-  `@EnableEurekaClient` 를 붙인 Application 은 Eureka 서버로부터 남의 주소를 가져오는 역할과 자신의 주소를 등록하는 역할을 둘 다 수행 가능하다
- Eureka Client 가 Eureka Server 에 자신을 등록할 때 **'spring.application.name'** 이 이름으로 사용된다



**RestTemplate 에 Eureka 적용하기**

- **목적**
  - Display -> Product 호출 시에 Eureka 를 적용하여 ip 주소를 코드나 설정 '모두'에서 제거

- [display] **application.yml** 변경
  **listOfServers 주석처리**
  -> 서버 주소는 Eureka Server 에서 가져오기



> 30초에 한번씩 로컬에 동기화
>
> Eureka 서버에서 전체 registry 목록을 가져와서 메모리에 저장해 놓고 그것을 통해서 Ribbon 이 Client Load Balancing 을 함



**정리**

 - @LoadBalanced Rest Template 에는 Ribbon + Eureka 연동
 - Eureka Client 가 설정되면, 코드상에서 서버 주소 대신 'application 이름'을 명시해서 호출 가능
 - Ribbon 의 Load Balancing 과 Retry 가 함께 동작
 (Retry : Server 에게 응답을 받지 못하였을 때 동일한 서버로 재시도 하거나 다른 서버로 재시도하는 기능)

 

### Declarative Http Client - Feign

- Interface 선언을 통해 자동으로 Http Client 를 생성
- RestTemplate 은 concreate 클래스라 테스트하기 어렵다
   (사용이 어렵고 배경 지식도 알아야 하고 테스트가 어려움)
- 관심사의 분리
 서비스의 관심 - 다른 리소스, 외부 서비스 호출과 리턴값
  관심 X - 어떤 URL, 어떻게 파싱할 것인가
- Spring Cloud 에서 Open-Feign 기반으로 Wrapping 한 것이 'Spring Cloud Feign'



**Declarative Http Client - Spring Cloud Feign**

- 인터페이스 선언만으로 Http Client 구현물을 만들어 줌

- url 제거시 Eureka 사용됨

  ```java
  @FeignClient(name="dp", url="http://localhost:8080/")
  public interface ProductResource {
    @RequestMapping(value="/query/{itemId}", method=RequestMethod.GET)
    String getItemDetail(@PathVariable(value="itemId") String itemId);
  }
  ```

  

- @FeignClient 를 Interface 에 명시
- 각 API 를 Spring MVC Annotation 을 이용해 정의



**Feign 클라이언트 사용하기**

- 목적
  - Display -> Product 호출 시에 **Feign** 을 사용해서 **RestTemplate 을 대체**해 보려고 함

- [display] build.gradle 에 dependency 추가

  ```yaml
  compile('org.springframework.cloud:spring-cloud-starter-openfeign')
  ```

- [display] DisplayApplication 에 @EnableFeignClients 추가

- [display] Feign 용 Interface 추가

Feign Client 는 Ribbon 을 사용해서 로드밸런싱을 하는데 
사용하는 프로젝트에서 Eureka 사용 안할 시 @FeignClint 의 url 에 주소 입력
url 을 쓰면 No Eureka, No Ribbon, No Hystrix 

[display] application.yml : Feign + Hystrix
feign.hystrix.enabled=true
메소드 하나하나가 Hystrix Command 로서 호출됨



정리
Feign 은 Interface 선언을 통해 자동으로 HTTP Client 를 만들어주는 'Declarative Http Client'
Open-Feign 기반으로 Spring Cloud 가 Wrapping 한 것이 오늘 실습한 'Spring Cloud Feign'


그럼 Hystrix Fallback 은??
-Feign 으로 정의한 Interface 를 직접 구현하고 Spring Bean 으로 선언
@Component
public class ProductResourceFallback implements ProductResource {
  @Override
  public String getItemDetail(String itemId) {
    return 'default value';
  }
}

- Fallback 클래스를 @Feign 선언시 명시
@FeignClient(fallback=ProductResouceFallback.class, name="dp", url="http://localhost:8080/")
public interface ProductResource {
  @Requestmaping(value="/query/{itemId}", method=RequestMethod.GET)
  String getItemDetail(@PathVariable(value="itemId") String itemId);
}

[display] 기본 Fallback 은 에러 원인(Exception) 을 알 수 없음. 'FallbackFactory 사용'
@Component
public class FeignProductRemoteServiceFallbackFactory implements FallbackFactory<FeignProductRemoteService> {
 @Override
 public FeignProductRemoteService create(Throwable cause) {
   System.out.println("t=" +cause);
   return productId -> "[this product is sold out ]";
 }
}

[display] Feign 용 Hystrix Fallback 명시
@FeignClient(name = "product", fallbackFactory = FeignProductRemoteServiceFallbackFactory.class)
public interface FeignProductRemoteService {
  @RequestMapping(path = "/product/{productId}")
  String getProductInfo(@PathVariable("productId") String productId);
}


[display] Feign 용 Hystrix 프로퍼티 정의
Feign 사용하는 경우 commandKey 이름 주의
ex) FeignProductRemoteService#getProductInfo(String)

정리

Feign 은 인터페이스 선언 + 설정으로 다음과 괕은 것들이 가능하다
- Http Client (변경 가능)
- Eureka 타겟 서버 주소 획득
- Ribbon 을 통한 Client-Side Load Balancing
- Hystrix 통한 Circuit Breaker

장애 유형
1) 특정 API 서버의 인스턴스가 한개 Down 된 경우
Eureka - Heartbeat 송신이 중단됨으로 일정 시간 후 목록에서 사라짐
Ribbon - IOException 이 발생한 경우 다른 인스턴스로 Retry
Hystrix - Circuit 은 오픈되지 않음(Error = 33%)
Fallback, Timeout 은 동작

2) 특정 API 가 비정상 동작(지연, 에러)
Hystrix - 해당 API 를 호출하는 Circuit Breaker 오픈
Fallback, Timeout 도 동작




8강. API Gateway - Zuul

API Gateway
- 클라이언트와 백엔드 서버 사이의 출입문(front door)
- 라우팅(라우팅, 필터링, API 변환, 클라이언트 어댑터 API 서비스 프록시)
- 횡단 관심사 cross-service concerns (
 - 보안, 인증, 인가
 - 일정량 이상의 요청 제한(rate limiting)
 - 계측(metering)
 - Logging
 - Proxy


Zuul
1.Zuul 의 모든 API 요청은 HystrixCommand 로 구성되어 전달됨
- 각 API 경로(서버군) 별로 Circuit Breaker 생성
- 하나의 서버군이 장애를 일으켜도 다른 서버군의 서비스에는 영향이 없음
- CircuitBreaker / ThreadPool 의 다양한 속성을 통해 서비스별 속성에 맞는 설정 가능

2.API 르 ㄹ전달할 서버의 목록을 갖고 Ribbon 을 통해 Load-Balancing을 수행한다.
- 주어진 서버 목록들을 Round-Robin 으로 호출
- Coding 을 통해 LoadBalancing 방식 Customize 가능

3.Eureka Client 를 사용하여 주어진 URL 의 호출을 전달할 '서버리스트'를 찾는다.
- Zuul 에는 Eureka Client 가 내장
- 각 Url에 Mapping 된 서비스 명을 찾아서 Eureka Server 를 통해 목록을 조회 한다.
- 조회된 서버 목록을 'Ribbon' 클라이언트에게 전달한다.

4.Eureka + Ribbon  에 의해서 결정된 Server 주소로 HTTP 요청
- Apache Http Client 가 기본 사용
- OKHttp Client 사용 가능

5.선택된 첫 서버로의 호출이 실패할 경우 Ribbon 에 의해서 자동으로 Retry 수행
- Retry 수행 조건
 - Http Client 에서 Exception 발생
 - 설정된 HTTP 응답코드 반환

 11번가에서는 Zuul을 평소에 16대로 운영

Zuul 의 모든 호출은.
- HystrixCommand 로 실행되므로 Circuit Breaker 를 통해
 - 장애시 Fail Fast 및 Fallback 수행 가능
- Ribbon + Eureka 조합을 통해
 - 현재 서비스가 가능한 서버의 목록을 자동으로 수신
- Ribbon 의 Retry 기능을 통해
 - 동일한 종류의 서버들로의 자동 재시도가 가능

1. checkout
git reset HEAD --hard
git checkout tags/step-6-zuul-baseline -b my-step-6
2. [zuul] Zuul 과 Eureka 디펜던시 추가 (build.gradle)
compile('org.springframework.cloud:spring-cloud-starter-netflix-zuul')
compile('org.springframework.cloud:spring-cloud-starter-netflix-eureka-client')
compile('org.springframework.retry:spring-retry:1.2.2.RELEASE')

application.yml:Enable Zuul, Eureka
Main Class:
@EnableZuulProxy
@EnableDiscoveryClient
 (@EnableEurekaClient 와 동일한데 더 추상적으로 하고 싶다면 Discovery로)


zuul 로 요청
displays/**
eureka 에 등록된 product 로 프록시됨
response 가 오면 zuul 은 사용자에게 전달


Spring Cloud Zuul - Isolation

spring-cloud-zuul 의 기본 Isolation 은 Semaphore
Netflix Zuul 은 thread pool
spring-cloud-zuul 은 netflix zuul 로 감싸져 만들어짐

스레드를 할 때는 서블릿 스레드 요청이 Hystrix 에 의해서 격리가 되어 실행된다고 했다
그런데 세마포어를 사용하면 서블릿 스레드가 히스트릭스 메소드를 실행하기 전에 카운트를 하는 것임
semaphore 가 5면 서블릿 스레드가 많아도 넘어가는 값은 fallback 처리 되어 

semaphore 는 network timeout 을 격리시켜주지 못함
스레드가 격리를 할지 인터럽트를 할지 결정하는 것은 스레드 자체가 하는 것인데
스레드에 아무리 인터럽트를 날려도 제어하는 코드가 없으면 의미가 없음

semaphore 가 성능상으로는 더 좋음

spring-cloud-zuul 의 Isolation 을 THREAD 로 변경
zuul.ribbon-isolation-strategy : thread
모든 HystrixCommand 가 하나의 쓰레드풀에 들어감..

유레가 등록된 서비스 별로 THREAD 생성
zuul.thread-pool.useSeparateThreadPools : true
zuul.thread-pool.threadPoolKeyPrefix : true
-> 서비스 별 격리 성공

[zuul] application.yml 설정 변경
zuul:
  routes:
    product:
      path: /products/**
      serviceId: product
      stripPrefix: false
    display:
      path: /displays/**
      serviceId: display
      stripPrefix: false
  ribbon-isolation-strategy: thread
  thread-pool:
    use-separate-thread-pools: true
	thread-pool-key-prefix: zuul-
	

hystrix:
  command:
    default:
	  execution:
	    isolation:
		  thread:
		    timeoutInMilliseconds: 1000
	product:
	  execution:
	    isolation:
	      thread:
	        timeoutInMilliseconds: 10000
  threadpool:
    zuul-product:
      coreSize: 30
      maximumSize: 100
      allowMaximumSizeToDivergeFromCoreSize: true
    zuul-display:
      coreSize: 30
      maximumSize: 100
      allowMaximumSizeToDivergeFromCoreSize: true
	
Ribbon 에도 Timeout 을 지정해서 사용	
	
product:
  ribbon:
    MaxAutoRetriesNextServer: 1
    ReadTimeout: 3000
    ConnectTimeout: 1000
    MaxTotalConnections: 300
    MaxConnectionsPerHost: 100

display:
  ribbon:
    MaxAutoRetriesNextServer: 1
    ReadTimeout: 3000
    ConnectTimeout: 1000
    MaxTotalConnections: 300
    MaxConnectionsPerHost: 100

Spring Cloud Config
Zipkin, Spring Cloud Sleuth
 Distributed Tracing, Twitter

