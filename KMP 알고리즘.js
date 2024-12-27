
// 문자열 검색 - KMP 알고리즘

function fail(P) {
    var j = -1;
    var K = Array(P.length).fill(-1);
    for (var i = 1; i < K.length; i++) {
        j++;
        K[i] = j;
        if (P[j] !== P[i]) {
            while (j !== -1 && P[i] !== P[j]) {
                j = K[j];
            }
        }
    }
    return K;
}

function KMP(A, B) {
    var cnt = 0;
    var match = 0;
    for (var i = 0; i < A.length; i++) {
        if (A[i] === B[match]) {
            match += 1;
        } else {
            match = Math.max(0, K[match]);
            if (match > 0) {
                i--;
            } else {
                if (A[i] === B[0]) {
                    match += 1;
                }
            }
        }
        if (match === B.length) {
            cnt++;
            match = Math.max(0, K[match-1]);
            if (match > 0) {
                i--;
            } else {
                if (B.length > 1 && A[i] === B[0]) {
                    match += 1;
                }
            }
        }
    }
    return cnt;
}
