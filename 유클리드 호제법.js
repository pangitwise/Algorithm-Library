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