
// BigInt 트릭
// : 큰 실수끼리의 연산에서 높은 정밀도를 보장받기 위해 BigInt를 이용합니다.

// x: 정수
// correction: 보정된 정도
// roundPoint: 반올림하여 구할 위치
function changeBigIntToReal(x, correction, roundPoint) {
    var cor = correction;
    var integer = BigInt(x.length >= cor+1 ? x.slice(0, x.length-cor) : 0); 
    var decimal = x.length >= cor+1 ? x.slice(x.length-cor) : '0'.repeat(cor-x.length)+x;
    if (!roundPoint) return integer+'.'+decimal;

    var rp = roundPoint;
    var part = BigInt(decimal.slice(0, rp));
    if (decimal[rp] >= rp) part++;
    if (part === 10n**rp) {
        integer++;
        part = '0'.repeat(rp);
    } else {
        part = String(part);
        part = '0'.repeat(rp-part.length)+part;
    }
    return integer+'.'+part;
}



