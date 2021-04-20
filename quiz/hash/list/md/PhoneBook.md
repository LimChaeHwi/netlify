# 전화번호 목록

**작성일**: 2020

**사용언어**: `Java`

##### 방법

1. 

   



```java
class PhoneBook {
    public boolean solution(String[] phone_book) {
        boolean answer = true;
        for (int i = 0; i < phone_book.length; i++) {
            for (int j = 0; j < phone_book.length; j++) {
                if (i!=j && phone_book[j].indexOf(phone_book[i]) == 0) {
                        answer = false; break;
                }
            }
            if (!answer) break;
        }
        return answer;
    }
}
```

##### 기타





출처: https://programmers.co.kr/learn/courses/30/lessons/42577