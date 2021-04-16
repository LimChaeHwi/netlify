# 더 맵게

**작성일**: 2021-04-16

**사용언어**: `Java`

##### 방법

1. 매운지수 값 배열 `scoville` 을 정렬(오름차순)

2. 가장 작은 값 부터 순차적으로 맵기를 혼합

3. 혼합한 값을 배열의 다음 인덱스 값에 치환하면서 가장 작은 값이 기준값인 `K` 보다 큰 값이 되면 종료

4. 최소한의 혼합한 횟 수를 출력

   

```java
import java.util.Arrays;

public class Scoville {
    // 힙 문제
    int cnt = 0;
    public int solution(int[] scoville, int K) {
        int cnt = 0;
        int tmp = 0;
        if (scoville.length == 1) {
            cnt = -1;
            return cnt;
        }

        Arrays.parallelSort(scoville);

        int len = scoville.length-1;
        
        for (int i = 0; i < len; i++) {
            if (scoville[i] >= K) {
                break;
            }

            scoville[i+1] = scoville[i] + scoville[i+1]*2;
            cnt++;

            for (int j = i+1; j < len; j++) {

                if (scoville[j] > scoville[j+1]) {
                    tmp = scoville[j];
                    scoville[j] = scoville[j+1];
                    scoville[j+1] = tmp;
                } else {
                    break;
                }
            }

        }

        if (scoville[scoville.length-1] < K) cnt = -1;

        return cnt;
    }
}
```

##### 기타

효율성에서 점수를 받지 못함..



출처: https://programmers.co.kr/learn/courses/30/lessons/42626