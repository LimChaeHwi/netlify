# 완주하지 못한 선수

**작성일**: 2020

**사용언어**: `Javascript`

##### 방법

1. 참가자 배열 `participant` , 완주자 배열 `completion`을 정렬

2. 동일한 인덱스에 완주자 명단에 존재하지 않는 참가자를 `return`

   


```javascript
function solution(participant, completion) {
    var answer = '';
    var index;
	
	participant.sort();
	completion.sort();
	
	for (var i = 0; i < participant.length;i++) {
		if (participant[i] != completion[i]) {
			answer = participant[i];
			break;
		}
	}
	return answer;
}
```

##### 기타





출처: https://programmers.co.kr/learn/courses/30/lessons/42576