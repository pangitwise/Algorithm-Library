
// 트라이와 아호-코라식
// - 모든 문자가 소문자일 때의 기준입니다.

// 문제에서 요구하는 바에 따라 출력 함수를 다르게 설정해야 합니다.
// - 모든 패턴의 개수를 알기 위해서는 출력 함수에서 누적 합을 이용해야 합니다.

var base = 25001;

// node: 트라이의 문자열 정점
// depth: 정점의 깊이(등장 순서)
// parent: 부모 정점
// childNode: 자식 정점
// fail: 자식 정점 검색에 실패했을 경우 돌아가는 위치
// success: 패턴 존재 여부
// output: 현재 정점에서 찾을 수 있는 가장 긴 패턴
var node = Array(base);
var depth = Array(base);
var parent = Array(base);
var childNode = Array(base);
var fail = Array(base);
var success = Array(base);
var output = Array(base);

// 배열만을 이용한 트라이 구성
function makeTrie(patterns) {
    node[0] = '';
    parent[0] = undefined;
    childNode[0] = Array(26).fill(0);
    fail[0] = 0;
    success[0] = false;
    output[0] = undefined;
    depth[0] = 0;
    var idx = 1;
    for (var S of patterns) {
        var loc = 0;
        for (var j = 0; j < S.length; j++) {
            var chr = S[j].charCodeAt()-97;
            if (childNode[loc][chr]) {
                loc = childNode[loc][chr];
            } else {
                childNode[loc][chr] = idx;
                node[idx] = S[j];
                parent[idx] = loc;
                childNode[idx] = Array(26).fill(0);
                fail[idx] = undefined;
                success[idx] = false;
                depth[idx] = depth[loc]+1;
                output[idx] = undefined;
                loc = idx;
                idx++;
            }
        }
        success[loc] = true;
    }
}

function bfs() {
    var queue = [0];
    var dep = 0;
    while (queue.length > 0) {
        var tmp = [];
        for (var i of queue) {
            var chr = node[i].charCodeAt()-97;
            var p = parent[i];
            if (dep <= 1) {
                fail[i] = 0;
            } else {
                // 실패 함수 구현
                while (i !== 0) {
                    if (childNode[fail[p]][chr]) {
                        fail[i] = childNode[fail[p]][chr];
                        if (success[fail[i]]) output[i] = fail[i];
                        // 만약 해당 코드를 추가한다면, 출력 함수는 현재 정점에서 찾을 수 있는 가장 짧은 패턴을 반환하게 된다.
                        //if (output[fail[i]]) output[i] = output[fail[i]];
                        break;
                    } else {
                        if (fail[p] === fail[fail[p]]) {
                            fail[i] = 0;
                            break;
                        }
                        p = fail[p];
                    }
                }
            }
            for (var j of childNode[i]) {
                if (j) tmp.push(j);
            }
        }
        dep++;
        queue = tmp;
    }
}

function findPattern(S) {
    var matchCnt = 0;
    var j = 0;
    var loc = 0;
    while (true) {
        if (success[loc]) {
            // 패턴 검색에 성공했을 경우
        } else if (output[loc]) {
            // 현재 정점에서 유효 패턴이 존재하는 경우
        }
        if (j >= S.length) break;
        var chr = S[j].charCodeAt()-97;
        if (childNode[loc][chr]) {
            loc = childNode[loc][chr];
            j++;
        } else {
            if (loc === 0) {
                j++;
            } else {
                loc = fail[loc];
            }
        }
    }
    return matchCnt;
}