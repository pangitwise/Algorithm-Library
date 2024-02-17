
// 강한 연결 요소 + 2-SAT


// 1. 코사라주 알고리즘
// 정방향, 역방향 그래프 필요
// : 방향 그래프에서 후위 순회하며 스택에 쌓은 후,
// 스택에서 하나씩 pop하며 역방향으로 탐색하기
var visited1 = Array(V+1).fill(false);
var visited2 = Array(V+1).fill(false);
var stack1 = [];
for (var i = 1; i < V+1; i++) {
    if (visited1[i] === false) {
        dfs1(i);
    }
}
var list = [];
while (stack1.length > 0) {
    var j = stack1.pop();
    var scc = [j];
    if (visited2[j] === false) {
        visited2[j] = true;
        dfs2(j); 
        list.push(scc);
    }
    scc = [];
}

function dfs1(x) {
    for (var i of graph[x]) {
        if (visited1[i] === false) {
            visited1[i] = true;
            dfs1(i);
        }
    }
    stack1.push(x);
}

function dfs2(x) {
    for (var i of reverse[x]) {
        if (visited2[i] === false) {
            visited2[i] = true;
            scc.push(i);
            dfs2(i);
        }
    }
}


// 2. 타잔 알고리즘
// : 방문 번호를 낮은 순으로 갱신해 가며 스택에 저장해 갈 때,
// 방문 번호 = 원래 번호라면 scc이므로 스택에서 빼기
var id = [];
var visited = [];
var finished = [];
var graph = [];
var group = [];
for (var i = 0; i < N+1; i++) {
    graph.push([]);
    graph[-i] = [];
    id.push(undefined);
    id[-i] = undefined;
    visited.push(false);
    visited[-i] = false;
    finished.push(false);
    finished[-i] = false;
}
visited[0] = true;

// 그래프 만들기

var cmd = 0;
var stack = [];
var list = [];
var cnt = 0;
var canbeTrue = true;
for (var i = -N; i < N+1; i++) {
    if (visited[i] === false) {
        tarjan(i);
    }
}
function tarjan(x) {
    visited[x] = true;
    stack.push(x);
    id[x] = cmd;
    var origin = cmd;
    for (var i of graph[x]) {
        if (visited[i] === false) {
            cmd++;
            id[x] = Math.min(id[x], tarjan(i));
        } else {
            if (finished[i] === false) {
                id[x] = Math.min(id[x], id[i]);
            }
        }
    }
    if (id[x] === origin) {
        var scc = new Set();
        while (true) {
            var node = stack.pop();
            if (scc.has(-node)) canbeTrue = false;
            scc.add(node);
            finished[node] = true;
            if (node === x) break;
        }
        list.push(scc);
        cnt++;
    }
    return id[x];
}