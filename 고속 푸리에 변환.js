 
 // 고속 푸리에 변환 알고리즘

const tau = Math.PI*2;

Array.prototype.swap = function(a, b) {
    var tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
}


//ver. 1 - wr, wi를 함수 내에서 계산
function FFT(ar, ai, inv) {
    var n = ar.length;
    for (var [i, j] = [1, 0]; i < n; i++) {
        var bit = n>>1;
        while (!((j ^= bit)&bit)) bit >>= 1;
        if (i < j) {
            ar.swap(i, j);
            ai.swap(i, j);
        }
    }
    for (var i = 1; i < n; i <<= 1) {
        var th = inv ? Math.PI/i : -Math.PI/i;
        var wr = Math.cos(th);
        var wi = Math.sin(th);
        for (var j = 0; j < n; j += i << 1) {
            var [vr, vi] = [1, 0];
            for (var k = 0; k < i; k++) {
                var [er, ei] = [ar[j+k], ai[j+k]];
                var [or, oi] = [ar[i+j+k], ai[i+j+k]];
                var zr = vr*or - vi*oi;
                var zi = vr*oi + vi*or;
                ar[j+k] = er + zr;
                ai[j+k] = ei + zi;
                ar[i+j+k] = er - zr;
                ai[i+j+k] = ei - zi;
                tmp_vr = vr*wr - vi*wi;
                tmp_vi = vr*wi + vi*wr;
                [vr, vi] = [tmp_vr, tmp_vi];
            }
        }
    }
    if (inv) {
        for (var i = 0; i < n; i++) {
            ar[i] /= n;
        }
    }
}

function convolution(ar, ai, br, bi) {
    var n = Math.max(ar.length, br.length);
    var i = 0;
    while ((1 << i) < (n << 1)) i++;
    n = 1 << i;
    var da = n-ar.length;
    var db = n-br.length;
    for (var i = 0; i < da; i++) {ar.push(0); ai.push(0)};
    for (var i = 0; i < db; i++) {br.push(0); bi.push(0)};
    FFT(ar, ai, false);
    FFT(br, bi, false);
    for (var i = 0; i < n; i++) {
        tr = ar[i]*br[i] - ai[i]*bi[i];
        ti = ar[i]*bi[i] + ai[i]*br[i];
        ar[i] = tr;
        ai[i] = ti;
    }
    FFT(ar, ai, true);
    return ar.map(x => Math.round(x));
}


//ver. 2 - wr, wi를 FFT 함수 외부에서 미리 계산
function FFT(ar, ai, wr, wi, inv) {
    var n = ar.length;
    for (var [i, j] = [1, 0]; i < n; i++) {
        var bit = n>>1;
        while (!((j ^= bit)&bit)) bit >>= 1;
        if (i < j) {
            ar.swap(i, j);
            ai.swap(i, j);
        }
    }
    for (var i = 1; i < n; i <<= 1) {
        var ws = n/(i*2);
        for (var j = 0; j < n; j += i << 1) {
            var wdx = 0;
            for (var k = 0; k < i; k++, wdx += ws) {
                var [er, ei] = [ar[j+k], ai[j+k]];
                var [or, oi] = [ar[i+j+k], ai[i+j+k]];
                var [vr, vi] = [wr[wdx], inv ? -wi[wdx] : wi[wdx]];
                var zr = vr*or - vi*oi;
                var zi = vr*oi + vi*or;
                ar[j+k] = er + zr;
                ai[j+k] = ei + zi;
                ar[i+j+k] = er - zr;
                ai[i+j+k] = ei - zi;
            }
        }
    }
    if (inv) {
        for (var i = 0; i < n; i++) {
            ar[i] /= n;
        }
    }
}

function convolution(ar, ai, br, bi) {
    var n = Math.max(ar.length, br.length);
    var i = 0;
    while ((1 << i) < (n << 1)) i++;
    n = 1 << i;
    var da = n-ar.length;
    var db = n-br.length;
    for (var i = 0; i < da; i++) {ar.push(0); ai.push(0)};
    for (var i = 0; i < db; i++) {br.push(0); bi.push(0)};
    var [wr, wi] = route_w(n);
    FFT(ar, ai, wr, wi, false);
    FFT(br, bi, wr, wi, false);
    for (var i = 0; i < n; i++) {
        tr = ar[i]*br[i] - ai[i]*bi[i];
        ti = ar[i]*bi[i] + ai[i]*br[i];
        ar[i] = tr;
        ai[i] = ti;
    }
    FFT(ar, ai, wr, wi, true);
    return ar.map(x => Math.round(x));
}


function route_w(n) {
    var wr = [1];
    var wi = [0];
    var vr = Math.cos(-tau/n);
    var vi = Math.sin(-tau/n);
    for (var i = 1; i <= n; i++) {
        wr[i] = wr[i-1]*vr - wi[i-1]*vi;
        wi[i] = wr[i-1]*vi + wi[i-1]*vr;
    }
    return [wr, wi];
}