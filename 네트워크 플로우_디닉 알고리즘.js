// 네트워크 플로우 - 디닉 알고리즘
// N은 정점의 개수
// 양방향 간선에서 역방향 간선 생성 시 용량을 0으로 하면 안 된다!!
var graph = Array.from({length:N+1}, (v, k) => []);
var cap = Array.from({length:N+1}, (v, k) => Array(N+1).fill(0));
var flow = Array.from({length:N+1}, (v, k) => Array(N+1).fill(0));
var level = Array(N+1).fill(-1);
level[1] = 0;
var work = Array(N+1).fill(0);
for (var i = 1; i < N+1; i++) {
    var [start, end] = input[i].split(' ').map(x => +x);
    if (cap[start][end] === 0) {
        graph[start].push(end);
    }
    cap[start][end] += 1;
}
for (var i = 1; i < N+1; i++) {
    for (var j = 1; j < graph[i].length; j++) {
        var node = graph[i][j];
        if (cap[node][i] === 0) graph[node].push(i);
    }
}

var total = 0;
while (bfs()) {
    work = Array(N+1).fill(0);
    while (true) {
        var f = dfs(1, 2, Infinity);
        if (f === 0) break;
        total += f;
    }
}
console.log(total);


function bfs() {
    level = level.fill(-1);
    level[1] = 0;
    lev = 1;
    list = [1];
    while (list.length) {
        var queue = [];
        for (var i of list) {
            for (var j of graph[i]) {
                if (level[j] === -1 && cap[i][j]-flow[i][j] > 0) {
                    level[j] = lev;
                    queue.push(j);
                }
            }
        }
        list = queue;
        lev++;
    }
    if (level[2] === -1) {
        return false;
    } else {
        return true;
    }
}

function dfs(cur, goal, stream) {
    if (cur === goal) return stream;
    for (var i = work[cur]; i < graph[cur].length; i++) {
        var next = graph[cur][i];
        if (level[next] === level[cur]+1 && cap[cur][next]-flow[cur][next] > 0) {
            stream = Math.min(stream, cap[cur][next]-flow[cur][next]);
            var tmp = dfs(next, goal, stream);
            if (tmp > 0) {
                flow[cur][next] += tmp;
                flow[next][cur] -= tmp;
                return tmp;
            }
        }
        work[cur]++;
    }
    return 0;
}