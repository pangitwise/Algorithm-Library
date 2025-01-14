
// Z 알고리즘
//: 문자열 S와 S의 접미사의 공통 접두사의 길이를 세는 알고리즘

function Z_Array(S) {
    var Z = Array(S.length).fill(undefined);
    Z[0] = S.length;
    var cnt = 1;
    for (var i = 1; i < S.length;) {
        // cnt = k일 때, 적어도 k-1까지는 접두사가 서로 같음이 보장되므로 1을 빼준다.
        cnt--;
        j = cnt;
        while (S[i+j] === S[j]) {
            cnt++;
            j++;
        }
        Z[i] = cnt;
        i++;
        cnt--;
        for (var k = 1; cnt > 1; k++, cnt--, i++) {
            Z[i] = Math.min(Z[k], cnt);
            if (Z[i] === cnt) {
                break;
            }
        }
        if (cnt <= 0) cnt = 1;
    }
}
