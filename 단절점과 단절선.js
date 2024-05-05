
// 단절점과 단절선 알고리즘

// 정점의 개수
var V;

var visited = [];
var origin = [];
origin[0] = Infinity;
var outDegree = [];
var articulationPoint = [];

for (var i = 1; i < V+1; i++) {
    if (!visited[i]) {
        var root = i;
        dfs(root, 1, 0);
    }
}


// 단절점 알고리즘
// - 수정 시 detourEnd의 초기 참조값은 Infinity가 되도록 수정해야함
function dfs(x, dep, p) {
    visited[x] = true;
    origin[x] = dep;
    var highNode = p;
    var isAP = false;
    var detourStart = false;
    var detourEnd = 0;
    for (var i of graph[x]) {
        if (!visited[i]) {
            outDegree[x] += 1
            var tmpEnd = dfs(i, dep+1, x);
            // 깊이가 작은 우회로로 갱신
            if (origin[tmpEnd] < origin[detourEnd]) {
                detourEnd = tmpEnd;
            } 
            // Root가 아니고
            if (x !== root && !isAP) {
                // 우회로의 끝점이거나, 우회로가 없는 점과 이어져 있다면 단절점
                if (tmpEnd === x || tmpEnd === 0) {
                    articulationPoint.push(x);
                    isAP = true;
                }
            }
        } else {
            // 깊이가 가장 작은 우회로 찾기
            origin[i] < origin[highNode] ? highNode = i : 0;
        }
    }
    // 가장 깊이가 낮은 우회로 설정
    if (highNode !== p) {
        if (detourEnd === 0) {
            detourStart = true;
            detourEnd = highNode;
        } else {
            origin[highNode] < origin[detourEnd] ? detourEnd = highNode : 0;
        }
    }
    if (!isAP) {
        // root이고, 진출 차수가 2 이상이라면 단절점
        if (x === root && outDegree[x] >= 2) {
            articulationPoint.push(x);
            // Root가 아니고, 우회로가 없거나 그 시작점이며, 진출 차수가 1 이상이라면 단절점
        } else if (x !== root && (detourEnd === 0 || detourStart) && outDegree[x] >= 1) {
            articulationPoint.push(x); 
        }
    }
    // 우회로 초기화
    if (detourEnd === x) detourEnd = 0;
    return detourEnd;
}



var articulationLine = [];

// 단절선 알고리즘
// - 수정 시 detourEnd의 초기 참조값은 Infinity가 되도록 수정해야함
function dfs(x, dep, p) {
    visited[x] = true;
    origin[x] = dep;
    var highNode = p;
    var detourStart = false;
    var detourEnd = 0;
    var candidate = [];
    for (var i of graph[x]) {
        if (!visited[i]) {
            outDegree[x] += 1
            var tmpEnd = dfs(i, dep+1, x);
            // 깊이가 작은 우회로로 갱신
            if (origin[tmpEnd] < origin[detourEnd]) {
                detourEnd = tmpEnd;
            } 
            // 우회로가 없는 점과 이어져 있다면 단절선
            if (tmpEnd === 0) {
                var a; var b;
                x < i ? [a, b] = [x, i] : [a, b] = [i, x];
                articulationLine.push([a, b]);
            }
        } else {
            // 깊이가 가장 작은 우회로 찾기
            origin[i] < origin[highNode] ? highNode = i : 0;
        }
    }
    // 가장 깊이가 낮은 우회로 설정
    if (highNode !== p) {
        if (detourEnd === 0) {
            detourStart = true;
            detourEnd = highNode;
        } else {
            origin[highNode] < origin[detourEnd] ? detourEnd = highNode : 0;
        }
    }
    // 우회로 초기화
    if (detourEnd === x) detourEnd = 0;
    return detourEnd;
}