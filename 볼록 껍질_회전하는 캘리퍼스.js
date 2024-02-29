// 볼록 껍질 구현 함수입니다.

// point 집합은 x축(1), y축(2) 기준 오름차순으로 정렬되어 있어야 합니다. 

function makeConvexHull(point) {
    // 아래 껍질
    var convexHull = [point[0]];
    var tmp = [];
    var ban = false;
    for (var i = 1; i < point.length; i++) {
        if (point[i][0] > point[i-1][0]) tmp.push(point[i]);
        var pass = searchConvexHull(convexHull, tmp);
        if (!pass) i--;
    }
    // 아래 껍질 재참조 금지: 벡터곱이 0일 경우
    var [x1, y1] = convexHull[convexHull.length-1];
    var [x2, y2] = tmp[0];
    var lastVector = [x2-x1, y2-y1];
    var ban = true;
    // 위 껍질
    for (var i = point.length-1; i > -1; i--) {
        if (ban && i < point.length-1) {
            var [x2, y2] = tmp[0];
            var [x3, y3] = points[i];
            var thisVector = [x3-x2, y3-y2];
            if (vectorCCW(lastVector, thisVector) === 0) {
                continue;
            } else {
                ban = false;
            }
        }
        if (i === point.length-1 || i === 0 || point[i][0] < point[i+1][0]) tmp.push(point[i]);
        var pass = searchConvexHull(convexHull, tmp);
        if (!pass) i++;
    }
    // 마지막 세 개의 점 처리
    while (true) {
        var [x1, y1] = convexHull[convexHull.length-2];
        var [x2, y2] = convexHull[convexHull.length-1];
        var [x3, y3] = convexHull[0];
        var direction = ccw(x1, x2, x3, y1, y2, y3);
        if (direction > 0) {
            break;
        } else {
            convexHull.pop();
        }
    }
    return convexHull;
}

function searchConvexHull(convexHull, tmp) {
    var reverse = -1;
    if (tmp.length === 2) {
        var [x1, y1] = convexHull[convexHull.length-1];
        var [x2, y2] = tmp[0];
        var [x3, y3] = tmp[1];
        var direction = ccw(x1, x2, x3, y1, y2, y3);
        if (convexHull.length > 1) {
            var [x0, y0] = convexHull[convexHull.length-2];
            reverse = ccw(x2, x1, x0, y2, y1, y0);
        }
        if (direction >= 0 && reverse <= 0) {
            if (reverse === 0) convexHull.pop();
            convexHull.push(tmp.shift());
        } else if (direction > 0 && reverse > 0) {
            convexHull.pop();
            tmp.pop();
            return false;
        } else if (direction <= 0) {
            tmp.shift();
        }
    }
    return true;
}

function ccw(x1, x2, x3, y1, y2, y3) {
    return x1*y2+x2*y3+x3*y1-y1*x2-y2*x3-y3*x1;
}

// 회전하는 캘리퍼스

function rotatingCalipers(convexHull) {
    var len = convexHull.length;
    var i = 0;
    var j = 1;
    var pair = [];
    while (i < len) {
        var [x1, y1] = convexHull[i];
        var [xn1, yn1] = convexHull[(i+1)%len];
        var [x2, y2] = convexHull[j%len];
        var [xn2, yn2] = convexHull[(j+1)%len];
        var vec1 = [xn1-x1, yn1-y1];
        var vec2 = [xn2-x2, yn2-y2];
        var dir = vectorCCW(vec1, vec2);
        if (dir > 0) {
            j++;
        } else {
            if (dir === 0) {
                pair.push([i%len, (j+1)%len]);
            } else {
                pair.push([i%len, j%len]);
            }
            i++;
        }
    }
    return pair;
}
