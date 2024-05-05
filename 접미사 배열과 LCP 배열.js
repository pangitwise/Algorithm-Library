
// 접미사 배열과 LCP 배열 알고리즘
// - Manber-Myers 알고리즘 + Kasai's 알고리즘

function suffixArray(S) {
    var sa = Array.from({length:S.length}, (v, k) => k);
    var list = [];
    for (var i = 0; (1<<i) <= (S.length<<1); i++) {
        var rank = Array(S.length).fill(undefined);
        var num = 1;
        if (i === 0) {
            sa.sort(function(a,b) {
                return S[a].localeCompare(S[b]);
            });
            rank[sa[0]] = num;
            for (var j = 1; j < sa.length; j++) {
                var last = sa[j-1];
                var idx = sa[j];
                if (S[idx] !== S[last]) num++;
                rank[idx] = num;
            }
        } else {
            var dep = 1<<(i-1);
            sa.sort(function(a,b){
                var [a1, a2] = [list[a], a+dep < S.length ? list[a+dep] : S.length-(a+dep)];
                var [b1, b2] = [list[b], b+dep < S.length ? list[b+dep] : S.length-(b+dep)];
                if (a1 !== b1) return a1-b1;
                if (a1 === b1) return a2-b2;
            });
            rank[sa[0]] = num;
            for (var j = 1; j < sa.length; j++) {
                var last = sa[j-1];
                var idx = sa[j];
                var [p1, p2] = [list[idx], idx+dep < S.length ? list[idx+dep] : S.length-(idx+dep)];
                var [q1, q2] = [list[last], last+dep < S.length ? list[last+dep]: S.length-(last+dep)];
                if (p1 !== q1 || p2 !== q2) num++;
                rank[idx] = num;
            }
        }
        list = rank;
    }
    return sa;
}

function LCP(sa) {
    var isa = [];
    for (var i = 0; i < sa.length; i++) {
        var idx = sa[i];
        isa[idx] = i;
    }
    var lcp = Array(isa.length).fill(0);
    var k = 0;
    for (var i = 0; i < isa.length; i++) {
        var idx = isa[i];
        if (idx === isa.length-1) continue;
        var j = sa[idx+1];
        while (i+k < isa.length && j+k < isa.length) {
            if (S[i+k] !== S[j+k]) {
                break;
            }
            k++;
        }
        lcp[isa[j]] = Math.max(lcp[isa[j]], k);
        if (k > 0) k--;
    }
    return lcp;
}
