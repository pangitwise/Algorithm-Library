
// 밀러-라빈 소수 판별법과 폴라드 로 알고리즘
// - 페르마의 소정리를 이용하여 큰 수 N이 소수인지 빠르게 판별하고,
// 생성함수와 생일문제를 이용하여 N의 비자명한 소인수를 빠르게 찾습니다.
//
// 둘을 이용해 N을 빠르게 소인수분해할 수 있습니다.


// 판별을 위한 밑. base의 최댓값에 따라 밑의 종류와 수는 변동.
var list = [2, 7, 61];

// 2의 거듭제곱 전처리
var base = 1n;
var powerOfTwo = [];
var limit = 2n**62n;
while (base <= limit) {
    powerOfTwo.push(base);
    base *= 2n;
}


// 폴라드 로를 이용한 소인수분해
function primeFactorization(N) {
    var c = 0n;
    var s = 0;
    var ans = [];
    while (!isPrime(N)) {
        var pf = pollard_rho(2n+c, N, s)
        if (pf) {
            // 비자명한 인수가 소수이면 반환하고, 아닐 경우 다시 소인수 분해
            if (isPrime(pf)) {
                ans.push(pf);
            } else {
                primeFactorization(pf);
            }
            N /= pf;
            c = 0n;
            s = 0;
        } else {
            // 탐색에 실패할 경우, 생성함수와 초기값을 달리하여 다시 탐색
            c++;
            s ^= 1;
            continue;
        }
    }
    ans.push(N);
    return ans.sort((a,b) => Number(a-b));
}


function pollard_rho(start, N, s) {
    if (N === 25n) return 5n;
    var x = start;
    var y = start;
    var d = 1n;
    while (d === 1n) {
        s === 0 ? x = g(x, N) : x = h(x, N);
        s === 0 ? y = g(g(y, N), N) : y = h(h(y, N), N);
        var gap = x-y;
        if (gap < 0n) gap *= -1n;
        d = gcd(gap, N);
    }
    if (d === N) {
        return false;
    } else {
        return d;
    }
}

// 생성함수 두 종류 이용
function g(x, N) {
    return (x**2n+1n)%N;
}

function h(x, N) {
    return (x**2n+x+1n)%N;
}

function gcd(a, b) {
    var r = a%b;
    if (r === 0n) {
        return b;
    } else {
        return gcd(b, r);
    }
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
    var d = N-1n;
    while (d%2n === 0n) {
        d /= 2n;
    }
    // 2^d ≡ 1 or -1 (mod N) 이면 강한 소수 (d는 홀수)
    var value = power(a, d, N);
    if (value === 1n || value === N-1n) {
        return true;
    } else {
        // 2^(2s*d) ≡ -1 (mod N) 인 경우가 존재하면 강한 소수 (d는 홀수)
        while (d <= (N-1n)/2n) {
            d *= 2n;
            value = value**2n%BigInt(N);
            if (value === N-1n) {
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
    var p = a;
    var result = 1n;
    while (powerOfTwo[list.length] <= d) {
        list.push(p);
        p *= list[list.length-1];
        p %= N;
    }
    var cnt = 0n;
    for (var i = list.length-1; i >= 0; i--) {
        var next = powerOfTwo[i];
        if (next + cnt <= d) {
            cnt += next;
            result *= list[i];
            result %= N;
        }
    }
    return result;
}
