// 두 수의 최대공약수와 최소공배수를 구하는 함수입니다.

Number.prototype.GCD = function(x) {
    if (this <= 0 || x <= 0) {
        return Error('자연수만 입력하세요')
    }
    if (Number.isInteger(Number(this)) === false || Number.isInteger(x) === false) {
        return Error('자연수만 입력하세요')
    }
    const A = Math.max(this, x);
    const B = Math.min(this, x);
    var mod = A%B;
    if (mod === 0) {
        var GCD = B;
    } else if (mod !== 0) {
        while (mod_A+mod_B !== 0) {
            var mod_A = A%mod;
             var mod_B = B%mod;
            if (mod_A === 0 && mod_B === 0) {
               var GCD = mod;
               break;
            }
            if (mod_A*mod_B !== 0) {
                var mod = Math.min(mod_A, mod_B);
            } else {
                var mod = Math.max(mod_A, mod_B);
            }
        }
    }
    return GCD
}

Number.prototype.LCM = function(x) {
    var GCD = this.GCD(x);
    var LCM = this*x/GCD;
    if (Number.isNaN(LCM)) {
        return Error('자연수만 입력하세요')
    }
    return LCM;
}

// 간단한 유클리드 호제법
function gcd(a, b) {
    var r = a%b;
    if (r === 0) return b;
    return gcd(b, r);
}


// 확장 유클리드 호제법
// - ax+by = N 꼴의 문제 풀기
var x = [];
var y = [];
var R = [];

function EEA(a, b, dep) {
    var r = a%b;
    var q = a/b;
    q < 0 ? q = Math.ceil(q) : q = Math.floor(q);
    if (r < 0) {
        r += Math.abs(b);
        b < 0 ? q += 1 : q -= 1;
    }
    // a = bq+r이므로, a-bq = r
    if (dep === 0) {
        var xi = 1;
        var yi = -q;
    // b = rq1+r1이므로, b = (a-bq)q1+r1
    // a*(-q1) + b(1-q*q1) = r1
    } else if (dep === 1) {
        var xi = -q;
        var yi = 1-y[dep-1]*q;
    // 재귀적으로
    // r_m = am+bm, r_n = an+bn이면 r_m = r_n*q+r_o
    // am+bm = anq+bnq+r_o. a(m-nq)+b(m-nq) = r_o
    } else {
        var xi = x[dep-2]-x[dep-1]*q;
        var yi = y[dep-2]-y[dep-1]*q;
    }
    x.push(xi);
    y.push(yi);
    R.push(r);
    if (r === 1) {
        candy1 = xi;
    }
    if (r === 0) return b;
    return EEA(b, r, dep+1);
}
