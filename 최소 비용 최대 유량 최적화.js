
// Dinic Style SPFA 최적화 MCMF 알고리즘

// - 그래프가 희소 배열일 때 효율적
// 예제는 N*M 격자판에서의 MCMF를 찾는 경우로
// 소스와 싱크는 인접 행렬, 나머지는 인접 리스트

var maxPrice = 0;
while (true) {
    var min_value = Array(N*M+2).fill(Infinity);
    var visited = Array.from({length:N*M+2}, (v, k) => []);
    SPFA(0);
    if (min_value[N*M+1] === 10) break;
    var work = Array(N*M+2).fill(0);
    while (true) {
        var check = Array(N*M+2).fill(false);
        var f = 0;
        // 싱크 -> 소스 역방향 그래프이므로 dfs를 싱크에서 시작
        dfs(N*M+1, Infinity);
        if (f === 0) break;
        maxPrice += f;
    }
}
console.log(maxPrice)


// SPFA: 큐를 이용한 벨만-포드 최적화 및 DAG 그래프 구성
// visited 그래프가 싱크 -> 소스 역방향으로 구성된다.
function SPFA(start) {
    min_value[start] = 0;
    list = [0];
    cnt = 0;
    while (list.length > 0) {
        var isInQueue = Array(N*M+2).fill(false);
        var queue = [];
        for (var j = 0; j < list.length; j++) {
            var cur = list[j];
            var w = min_value[cur];
            for (var k = 0; k < graph[cur].length; k++) {
                cnt++;
                var [next, _w] = graph[cur][k];
                if (cur === 0 || cur === N*M+1) {
                    var idx = next;
                } else {
                    var idx = k;
                }
                // 가중치가 작아지면 그래프 갱신
                if (w+_w <= min_value[next] && cap[cur][idx]-flow[cur][idx] > 0) {
                    if (w+_w < min_value[next]) {
                        min_value[next] = w+_w;
                        visited[next] = [cur]; 
                        if (!isInQueue[next]) {
                            queue.push(next);
                            isInQueue[next] = true;
                        }
                    } else {
                        // 가중치가 같을 경우 그래프에 추가
                        visited[next].push(cur);
                    }
                }
            }
        }
        list = queue;
    }
}

function dfs(x, stream) {
    // 역방향이므로 소스에서 리턴
    if (x === 0) return stream;
    check[x] = true;
    for (var i = work[x]; i < visited[x].length; i++) {
        // 유량 정보는 소스 -> 싱크이므로 그에 맞춰서 조정
        var next = visited[x][i];
        var idx = findIndex(next, x);
        if (cap[next][idx]-flow[next][idx] > 0 && check[next] === false) {
            var tmp = dfs(next, Math.min(stream, cap[next][idx]-flow[next][idx]));
            if (tmp > 0) {
                var _idx = findIndex(x, next);
                flow[next][idx] += tmp;
                flow[x][_idx] -= tmp;
                if (x !== N*M+1) return tmp;
                // 최적화의 핵심: DFS 1번으로 그래프 내의 모든 최단 거리를 탐색해서 유량 흘리기
                if (x === N*M+1) f += tmp; 
            }
        }
        work[x]++;
    }
    return 0;
}

// 인접 리스트에서 목표 정점 인덱스 찾기
function findIndex(node, target) {
    if (node === 0 || node === N*M+1) {
        return target;
    } else {
        for (var i = 0; i < graph[node].length; i++) {
            var [v, w] = graph[node][i];
            if (v === target) {
                return i;
            }
        }
    }
}