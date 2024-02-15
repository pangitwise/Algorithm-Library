
// 최소 힙 구현 함수입니다.

Array.prototype.Hpush = function(...x) {
    var element = [...x];
    while (element.length !== 0) {
        this.push(element.pop());
        var d = this.length-1;
        var s = Math.floor(d/2)
        while (this[d] < this[s]) {
            this[d] += this[s];
            this[s] -= this[d];
            this[d] += this[s];
            this[s] *= -1;
            var d = s;
            var s = Math.floor(d/2);
            if (d === 1) {
                break;
            }
        }
    }
}

Array.prototype.Hshift = function() {
    if (this.length === 1) {
        return undefined;
    } else {
        if (this.length !== 2) {
            var min = this.splice(1, 1, this.pop());
        } else {
            var min = this.pop();
        }
        var s = 1;
        var d1 = s*2;
        var d2 = s*2+1;
        while (this[s] > this[d1] || this[s] > this[d2]) {
            if (this[d2] === undefined) {
                var d = d1;
            } else {
                if (this[d1] < this[d2]) {
                    var d = d1;
                } else {
                    var d = d2;
                }
            }
            this[s] += this[d];
            this[d] -= this[s];
            this[s] += this[d];
            this[d] *= -1;
            var s = d;
            var d1 = s*2;
            var d2 = s*2+1;
            if (this[d1] === undefined && this[d2] === undefined) {
                break;
            }
        }
        return min;
    }
}



// 데이크스트라 라이브러리입니다.

Array.prototype.Hpush = function(...x) {
    var element = [...x];
    while (element.length !== 0) {
        this.push(element.pop());
        var d = this.length-1;
        loc[this[d]] = d;
        var s = Math.floor(d/2)
        while (min_value[this[d]] < min_value[this[s]]) {
            this[d] += this[s];
            this[s] -= this[d];
            this[d] += this[s];
            this[s] *= -1;
            loc[this[d]] = d;
            loc[this[s]] = s;
            var d = s;
            var s = Math.floor(d/2);
            if (d === 1) {
                break;
            }
        }
    }
}
 
Array.prototype.Hshift = function() {
    if (this.length === 1) {
       return undefined;
    } else {
        if (this.length !== 2) {
          var min = this.splice(1, 1, this.pop());
          loc[this[0]] = 0;
        } else {
          var min = this.pop();
          return min;
        }
        var s = 1;
        var d1 = s*2;
        var d2 = s*2+1;
        while (min_value[this[s]] > min_value[this[d1]] || min_value[this[s]] > min_value[this[d2]]) {
            if (min_value[this[d2]] === undefined) {
                var d = d1;
            } else {
                if (min_value[this[d1]] < min_value[this[d2]]) {
                    var d = d1;
                } else {
                    var d = d2;
                }
            }
            this[s] += this[d];
            this[d] -= this[s];
            this[s] += this[d];
            this[d] *= -1;
            loc[this[d]] = d;
            loc[this[s]] = s;
            var s = d;
            var d1 = s*2;
            var d2 = s*2+1;
            if (min_value[this[d1]] === undefined && min_value[this[d2]] === undefined) {
                break;
            }
        }
        return min[0];
    }
}
 
Array.prototype.Hupdate = function(x) {
    var d = loc[x];
    if (d === -1) {
       this.push(x);
       var d = this.length-1;
    }
   var s = Math.floor(d/2)
   while (min_value[this[d]] < min_value[this[s]]) {
       this[d] += this[s];
       this[s] -= this[d];
       this[d] += this[s];
       this[s] *= -1;
       loc[this[d]] = d;
       loc[this[s]] = s;
       var d = s;
       var s = Math.floor(d/2);
       if (d === 1) {
           break;
       }
   }
}

function dijstra(x) {
    min_value[x] = 0;
    min_value[0] = -Infinity;
    var graph = [];
    var heap = [];
    for (var i = 0; i < N+1; i++) {
        graph.push([]);
        heap.Hpush(i);
    }
    heap[0] = -Infinity;
    for (var i = 1; i < E+1; i++) {
        var [a, b, c] = input[i].split(' ').map(x => +x);
        graph[a].push([b, c]);
        graph[b].push([a, c]);
    }
    while (heap.length !== 1) {
        var v = heap.Hshift();
        loc[v] = -1;
        var w = min_value[v];
        for (var i of graph[v]) {
            var _v = i[0];
            var _w = i[1];
           if (w+_w === Infinity) {
                break;
            } else if (w+_w < min_value[_v]) {
                min_value[_v] = w+_w;
                heap.Hupdate(_v);
            }
        }
    }
}
