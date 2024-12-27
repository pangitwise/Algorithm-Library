
// 문자열 검색 - KMP 알고리즘

function fail(P) {
    var j = -1;
    var F = Array(P.length).fill(-1);
    for (var i = 1; i < F.length; i++) {
        j++;
        F[i] = j;
        while (j > -1 && P[i] !== P[j]) {
            j = F[j];
        }
    }
    return F;
}

function KMP(A, B, F) {
    var cnt = 0;
    var match = 0;
    for (var i = 0; i < A.length; i++) {
        var bol = false;
        A[i] === B[match] ? match++ : bol = true;
        if (match === B.length) {
            cnt++;
            match = F[match-1];
            bol = true;
        }
        if (bol) {
            while (match > -1 && A[i] !== B[match]) {
                match = F[match];
            }
            match++;
        }
    }
    return cnt;
}
