
// 밀러-라빈 소수 판별법
// - 페르마의 소정리를 이용하여 큰 수 N이 소수인지 빠르게 판별합니다.

// 판별을 위한 밑. base의 최댓값에 따라 밑의 종류와 수는 변동.
var list = [2, 7, 61];

// 2의 거듭제곱 전처리
var base = 1;
var powerOfTwo = [];
while (base <= 8589934591) {
    powerOfTwo.push(base);
    base *= 2;
}


function isPrime(N) {
    var bol = true;
    for (var i = 0; i < list.length; i++) {
        var a = list[i];
        if (a >= N) break;
        bol = bol&miller_rabin(a, N);
        if (!bol) break;
    }
    return bol;
}

function miller_rabin(a, N) {
    var d = N-1;
    while (Number.isInteger(d/2)) {
        d /= 2;
    }
    // 2^d ≡ 1 or -1 (mod N) 이면 강한 소수 (d는 홀수)
    var value = power(a, d, N);
    if (value === 1 || value === N-1) {
        return true;
    } else {
        // 2^(2s*d) ≡ -1 (mod N) 인 경우가 존재하면 강한 소수 (d는 홀수)
        if (N > 94906265) value = BigInt(value);
        while (d <= (N-1)/2) {
            d *= 2;
            N <= 94906265 ? value = value**2%N : value = value**2n%BigInt(N);
            if (Number(value) === N-1) {
                return true;
            }
        }
    }
    // 두 경우를 모두 만족시키지 않으면 합성수
    return false;
}


// a^d (mod N) 구하기
function power(a, d, N) {
    var list = [];
    if (N <= 94906265) {
        var p = a;
        var result = 1;
    } else {
        var p = BigInt(a);
        var result = 1n;
        var N = BigInt(N);
    }
    while (powerOfTwo[list.length] <= d) {
        list.push(p);
        p *= list[list.length-1];
        p %= N;
    }
    var cnt = 0;
    for (var i = list.length-1; i >= 0; i--) {
        var next = powerOfTwo[i];
        if (next + cnt <= d) {
            cnt += next;
            result *= list[i];
            result %= N;
        }
    }
    return Number(result);
}
