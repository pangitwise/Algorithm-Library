
// 매내처 알고리즘
// - 가장 긴 팰린드롬 부분 문자열을 찾습니다.

// 짝수 팰린드롬을 찾기 위해 더미를 끼워넣기
var S2 = ['#'];
for (var i = 0; i < S.length; i++) {
    S2.push(S[i]);
    S2.push('#');
}
var odd = manacher(S);
var even = manacher(S2)
odd = odd.map(x => (x-1)*2+1);
even = even.map((v, i) => i%2 === 1 ? 0 : v-1);

// 대칭성을 이용한 탐색
function manacher(S) {
    var L = S.length;
    var mana = Array(L).fill(1);
    var R = 0;
    var center = 0;
    for (var i = 1; i < L; i++) {
        var _i = center-(i-center);
        if (i < R && i+mana[_i] <= R) {
            mana[i] = mana[_i];
        } else {
            var j = 1;
            if (i < R) {
                var d = R-i;
                mana[i] += d;
                j += d;   
            }
            while (S[i+j] && S[i+j] === S[i-j]) {
                mana[i]++;
                j++;
            }
            R = i+mana[i]-1;
            center = i;
        }
    }
    return mana;
}
