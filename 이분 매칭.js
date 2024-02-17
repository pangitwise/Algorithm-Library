// 재귀를 이용한 이분 매칭 알고리즘

function bipartiteMatching(x, idx) {
    // x가 매칭된 적이 없으면 탐색 중단
    if (x === -1) return true;
    idx %= bipartiteGraph[x].length;
    var bol = false;
    var c = 0;
    for (var i = idx; c < bipartiteGraph[x].length; i++, c++) {
        i %= bipartiteGraph[x].length;
        var j = bipartiteGraph[x][i];
        // 해당 정점에 방문한 적이 있으면 넘기기
        if (visited[j]) continue;
        // 없을 경우, 해당 정점에 매칭되었던 기존 정점을 다른 정점에 매칭시킬 수 있는지 탐색 
        visited[j] = true;
        var originNum = assignedNum[j];
        var idx = assignedIdx[j];
        var valid = bipartiteMatching(originNum, idx+1);
        // 가능하다면, 현재 정점에 해당 정점을 매칭
        // 불가하다면, 다음 정점 탐색
        if (valid) break;
    }
    if (c < bipartiteGraph[x].length) {
        bol = true;
        assignedNum[j] = x;
        assignedIdx[j] = i;
    } else {
        bol = false;
    }
    return bol;
}


// 특수한 dfs 비재귀 그리디 이분 매칭

function dfs(k) {
    var stack = [k];
    loop:
    while (stack.length > 0) {
        var x = stack[stack.length-1];
        if (visited[x] === true && x < N && matched[x] === -1) {
            var num = graph[x][work[x]];
            if (matched[num] === -1) {
                matched[x] = num;
                matched[num] = x;
                cnt++;
            }
        }
        visited[x] = true;
        for (var i = work[x]; i < graph[x].length; i++) {
            var j = graph[x][i];
            if (!visited[j]) {
                stack.push(j);
                continue loop;
            }
            work[x]++;
        }
        if (x < N && matched[x] === -1) {
            stack.pop();
            var p = stack[stack.length-1];
            if (matched[p] === -1) {
                matched[x] = p;
                matched[p] = x;
                cnt++;
            }
        } else {
            stack.pop();
        }
    }
}